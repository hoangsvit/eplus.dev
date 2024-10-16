---
title: "Programming Assignment: Styling a page"
seoTitle: "Programming Assignment: Styling a page"
seoDescription: "In this exercise you will you will practice applying CSS rules to HTML elements."
datePublished: Tue Jul 09 2024 15:27:06 GMT+0000 (Coordinated Universal Time)
cuid: clyeke6nj000008mdb99r8qah
slug: programming-assignment-styling-a-page
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1720537838104/9d411ed5-698c-4aba-a43a-17c9efc092c6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1720538813563/37392971-dbbd-44ed-9040-d40ff7624f81.png

---

# Lab Instructions: Styling a page

In this exercise you will you will practice applying CSS rules to HTML elements.

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

## Task 1: Style an HTML page using CSS..

Objectives

* Define a CSS rule using an element selector.
    
* Define a CSS rule using an id selector.
    
* Define a CSS rule using a class selector.
    
* Define a CSS rule using a descendant selector.
    

Follow the Step by Step instructions below:

1. Open the `styles.css` file.
    
2. Add a CSS rule for the `body` element that sets the background color to `#E0E0E2`.
    
3. Add a CSS rule for the `h1` element that sets the text color to: `#721817`.
    
4. Add a CSS rule for the `h2` element that sets the text color to: `#721817`.
    
5. Add a CSS rule for the `center-text` CSS class that aligns the text to `center`.
    
6. Add a CSS rule for the HTML element with the id `logo`. Set its left and right margins to `auto` and changes its display to a `block` element.
    
7. Add a CSS rule for all `span` elements that are children of `h2` elements that sets the text color to `#FA9F42` and its font size to `0.75em`.
    
8. Add a CSS rule for the HTML element with the id `copyright`. Set its top padding to `12` pixels and its font size to `0.75em`.
    

## Final Step: Let's submit your code!

Nice work! To complete this assessment:

* Save your file through File -&gt; Save
    
* Select "Submit Assignment" in your Lab toolbar.
    

Your code will be autograded and return feedback shortly on the "Grades" tab.  
You can also see your score in your Programming Assignment "My Submission" tab.

### Tips

* If you get stuck, apply the CSS rules one at a time and verify their behaviour is what you expect.
    
* Review the lessons *Selecting and Styling*, *Text and color in CSS*, *Different types of selectors*, and *Box Model Introducction*.
    

---

```css
body {
    background-color: #E0E0E2;
}

h1 {
    color: #721817;
}

h2 {
    color: #721817;
}

#logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
}

h2 > span {
    color: #fa9f42;
    font-size: 0.75em;
}

#copyright {
    font-size: 0.75em;
    padding-top: 12px;
}

.center-text {
    text-align: center;
}
```