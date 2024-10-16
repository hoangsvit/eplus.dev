---
title: "Programming Assignment: Building a functional program in Javascript"
seoTitle: "Programming Assignment: Building a functional program in Javascript"
seoDescription: "In this exercise you'll get hands-on practice with functional programming concepts."
datePublished: Wed Jul 17 2024 09:11:13 GMT+0000 (Coordinated Universal Time)
cuid: clypmhmor000z0alfdnx4ahal
slug: programming-assignment-building-a-functional-program-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721207276416/15bbac01-f3cf-4c35-8e43-77800301e3ae.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721207457217/9e70ef92-23d8-4092-9e5c-068a5bca79bf.png

---

# Lab Instructions: Building a Functional Program

In this exercise you'll get hands-on practice with functional programming concepts.

Note: It is best to follow these instructions in the Preview tab on the right side.

> ### **Tips: Before you Begin**
> #### To view your code and instructions side-by-side, select the following in your VSCode toolbar:
> - View -> Editor Layout -> Two Columns
> - To view this file in Preview mode, right click on this README.md file and `Open Preview`
> - Select your code file in the code tree, which will open it up in a new VSCode tab.
> - Drag your assessment code files over to the second column. 
> - Great work! You can now see instructions and code at the same time. 
> - Questions about using VSCode? Please see our support resources here:  
    [Visual Studio Code on Coursera](https://www.coursera.org/learn/programming-with-javascript/supplement/roMvE/visual-studio-code-on-coursera)
> #### **To run your JavaScript code**
> - Select your JavaScript file
> - Select the "Run Code" button in the upper right hand toolbar of VSCode. Ex: It looks like a triangular "Play" button. <br><br>

<br>

## Task 1: Build a function-based console log message generator
In this exercise, your task is to code a function named `consoleStyler`, which accepts four parameters:
- `color`
- `background`
- `fontSize`
- `txt`

Inside the body of the consoleStyler() function declaration, you need to do the following:

1. Create a new variable named message, and assign the following to it on the very first line inside the consoleStyler() function body.: 
    ```
    "%c" + txt;
    ```

    Tip: Do not copy the 3 back ticks. These are used to format this document in the Preview tab.

2. Create a style variable and assign the following to it on the next line: 
    ```
    `color: ${color};`
    ```
	
	Tip: The single backtick before color and after the semi-colon must be included.

3. Next, update the style variable (using the += operator) with the following code: 
    ```
    `background: ${background};`
    ```
	
	Tip: The single backtick before background and after the semi-colon must be included.

4. Then, update the style variable (again, using the += operator) with the following code: 
    ```
    `font-size: ${fontSize};`
    ```
	
	Tip: The single backtick before font-size and after the semi-colon must be included.

5. Finally, console log the message and style variables inside the `consoleStyler` function declaration.

Hint: Be sure to use backticks (``) when updating your variable styles and not single ('') or double ("") quotes.

<br>

## Task 2: Build another console log message generator. 

Your task is to code another function, and name it `celebrateStyler()`. The function accepts a single parameter, reason, which should be of string data type.

Inside the function declaration's body, code the following: 

1. A new variable, named fontStyle, assigning it this code:
    ```
    "color: tomato; font-size: 50px";
    ```

2. On the next line, an if statement, verifying that `reason == "birthday"`. 

3. Inside the body of the if block, code the following: 
    ```
    console.log(`%cHappy birthday`, fontStyle);
    ```

4. On the next line, add an else if, and inside the parentheses, check that 
    ```
    reason == "champions"
    ```

5. Inside the else if block, add this code: 
    ```
    console.log(`%cCongrats on the title!`, fontStyle);
    ```

6. Add an else block, with the following code inside of it: 
    ```
    console.log(message, style);
    ```

<br>

## Task 3: Run both the consoleStyler and the celebrateStyler functions

1. Invoke the consoleStyler() function, with the following arguments:

    - `'#1d5c63'`

    - `'#ede6db'`

    - `'40px'`

    - `'Congrats!'`

2. Next, invoke the celebrateStyler() function, with the following argument:

    - `'birthday'`


## Task 4: Insert a congratulatory and custom message

1. Code another function, named `styleAndCelebrate()`.   
The function declaration's body should consist of two function invocations:
    ```
    consoleStyler(color, background, fontSize, txt);  
    celebrateStyler(reason);
    ```


2. Next, invoke the new function, using the following arguments:

    - `'ef7c8e'`
    - `'fae8e0'`
    - `'30px'`
    - `'You made it!'`
    - `'champions'`

<br>

## Final Step: Let's submit your code!
Nice work! To complete this assessment:
1. Save your file through File -> Save 
2. Select "Submit Assignment" in your Lab toolbar. 

Your code will be autograded and return feedback shortly on the "Grades" tab.  
You can also see your score in your Programming Assignment "My Submission" tab.
<br> <br> 

### Great job! Please continue to the next lesson.

----------

```javascript
// Task 1: Build a function-based console log message generator
function consoleStyler(color, background, fontSize, txt) {
    // Create a new variable named message
    let message = "%c" + txt;
    
    // Create a style variable and assign the initial color
    let style = `color: ${color};`;
    
    // Update the style variable with background
    style += `background: ${background};`;
    
    // Update the style variable with font size
    style += `font-size: ${fontSize};`;
    
    // Console log the message and style variables
    console.log(message, style);
}

// Task 2: Build another console log message generator
function celebrateStyler(reason) {
    // Create a new variable named fontStyle
    let fontStyle = "color: tomato; font-size: 50px";
    
    // Check if the reason is "birthday"
    if (reason == "birthday") {
        console.log(`%cHappy birthday`, fontStyle);
    }
    // Check if the reason is "champions"
    else if (reason == "champions") {
        console.log(`%cCongrats on the title!`, fontStyle);
    }
    // Default message if reason doesn't match
    else {
        console.log(`%cMessage not recognized`, fontStyle);
    }
}

// Task 3: Run both the consoleStyler and the celebrateStyler functions
consoleStyler('#1d5c63', '#ede6db', '40px', 'Congrats!');
celebrateStyler('birthday');

// Task 4: Insert a congratulatory and custom message
function styleAndCelebrate(color, background, fontSize, txt, reason) {
    // Invoke consoleStyler
    consoleStyler(color, background, fontSize, txt);
    
    // Invoke celebrateStyler
    celebrateStyler(reason);
}
// Call styleAndCelebrate
// Invoke the new function with the provided arguments
styleAndCelebrate('ef7c8e', 'fae8e0', '30px', 'You made it!', 'champions');
```