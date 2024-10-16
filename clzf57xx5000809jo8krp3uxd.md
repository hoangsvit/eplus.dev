---
title: "Knowledge check: Dynamic events and how to handle them - React Basic"
seoTitle: "Knowledge check: Dynamic events and how to handle them - React Basic"
seoDescription: "Knowledge check: Dynamic events and how to handle them - React Basic"
datePublished: Sun Aug 04 2024 05:49:49 GMT+0000 (Coordinated Universal Time)
cuid: clzf57xx5000809jo8krp3uxd
slug: knowledge-check-dynamic-events-and-how-to-handle-them-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722750327145/eca33899-64d1-4566-8bf9-ef811f376539.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722750579573/4219f304-b2fb-43da-9287-e42aecdcb594.png

---

1. **What code should be added to the element button to make this code snippet valid?**
    
    ```javascript
    function App() {
    
      function handleClick() {
        console.log("clicked")
      }
    
      return (
        <div className="App">
          <button >Click me</button>
        </div>
      );
    }
    ```
    
    * <mark>onClick={handleClick}</mark>
        
    * click=handleClick
        
    * onClick={handleClick()}
        
2. **Imagine that you have a variable named userLoggedIn and it’s set to the boolean of true. How would you complete the below clickHandler function declaration to toggle the value of the userLoggedIn boolean?**
    
    ```javascript
    function clickHandler() {
    }
    ```
    
    * userLoggedIn = false
        
    * userLoggedIn = true
        
    * <mark>userLoggedIn = !userLoggedIn</mark>
        
3. **Is a click handler on its own enough to change the values of variables in your React apps?**
    
    * <mark>No</mark>
        
    * Yes
        
4. **What are the ways to write an event-handling function in React. Select all that apply.**
    
    * <mark>Using a separate function expression</mark>
        
    * <mark>With an inline anonymous ES5 function</mark>
        
    * <mark>With an inline, anonymous ES6 function (an arrow function)</mark>
        
    * <mark>Using a separate function declaration</mark>
        
5. **Choose the appropriate code on line 3 of the following component – to handle a click event.**
    
    ```javascript
    function App() {
    
      function () {
        console.log("clicked")
      }
    
      return (
        <div className="App">
          <button onClick={handleClick}>Click me</button>
        </div>
      );
    }
    ```
    
    * <mark>function handleClick() {</mark>
        
    * function handleClick {
        
    * function HandleClick() {