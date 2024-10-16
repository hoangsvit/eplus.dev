---
title: "Module quiz: React Hooks and Custom Hooks - Advanced React"
seoTitle: "Module quiz: React Hooks and Custom Hooks - Advanced React"
seoDescription: "Module quiz: React Hooks and Custom Hooks - Advanced React"
datePublished: Mon Sep 16 2024 07:28:00 GMT+0000 (Coordinated Universal Time)
cuid: cm14onur4000v0ajs4rmb17an
slug: module-quiz-react-hooks-and-custom-hooks-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726471640843/82284a21-3b9e-4ab2-a071-fea55c7f4471.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726471671456/8ec0fdf4-27b2-4e8c-83e3-4080ffa5dc5a.jpeg

---

1. **How is array destructuring relevant to hooks in React?**
    
    * It makes it possible to reassign state objects.
        
    * It makes the Virtual DOM possible.
        
    * It makes it possible to handle click events.
        
    * <mark>It is a way to get individual items from an array of items, and save those individual items as separate components.</mark>
        
2. **Is the following paragraph correct?**
    
    **With array destructuring, you are free to give any variable name to the items that you destructure from an array. Contrary to that, when destructuring objects, you have to destructure a property of an object using that exact property's name as the name of the destructured variable.**
    
    * <mark>Yes</mark>
        
    * No
        
3. **The** `useEffect` **hook is a way to:**
    
    * handle visual effects (animations and transitions) in React
        
    * handle one-way data flows
        
    * <mark>handle a </mark> *<mark>side effect</mark>*<mark>.</mark>
        
4. **Which answer is correct about the following code snippet?**
    
    ```javascript
    useEffect( () => {
      if (data !== '') {
        setData('test data')
      }
    })
    ```
    
    * <mark>This code is breaking the rules of hooks</mark>
        
    * This code is not breaking the rules of hooks
        
    * This code is ok, except the fact that you should replace the if statement with a ternary operator.
        
5. **Choose an example of a side-effect with which you’d need to use a useEffect hook:**
    
    * <mark>Run a Fetch API call in React.</mark>
        
    * Update the value of the state variable in a child component.
        
    * Render some prop values on the screen.
        
6. **Complete the sentence:**
    
    **The** `useState` **hook starts with an initial state, but...**
    
    * the `useReducer` hook cannot be used to track the state at all.
        
    * <mark>the </mark> `useReducer` <mark>hook gets a reducer function in addition to the initial state.</mark>
        
    * the `userReducer` hook must be used when the initial state is an object.
        
7. **True or false:** `useRef` **is a custom hook in React.**
    
    * Yes.
        
    * <mark>No</mark>
        
8. **JavaScript is a single-threaded language, meaning...**
    
    * ...you can use it with React only when this single thread is used with the `useEffect` hook.
        
    * <mark>...it can only do a single thing at any given time.</mark>
        
    * ...you can use it with React only when this single thread is passed to the `useState` variable.
        
9. **Which statement is correct about the following code snippet:**
    
    ```javascript
    import { useEffect } from "react";
    
    function useConsoleLog(varName) {
      useEffect(() => {
        console.log(varName);
      });
    }
    
    export default useConsoleLog;
    ```
    
    **Choose the correct statement below.**
    
    * <mark>This is an example of a custom hook.</mark>
        
    * This code is an example of an implicit state-updating function.
        
    * This code is an example of an explicit state-updating function.
        
10. Find the error in this code:
    
    ```javascript
    import {useState} from "react";
    
    export default function App() {
      const [restaurantName, setRestaurantName] = useState("Lemon");
    
      function updateRestaurantName() {
        useRestaurantName("Little Lemon");
      };
    
      return (
        <div>
          <h1>{restaurantName}</h1>
          <button onClick={updateRestaurantName}>
            Update restaurant name
          </button>
        </div>
      );
    };
    ```
    
    * The `onClick` event should not be this:
        
    * `onClick={updateRestaurantName}`
        
    * <mark>The code inside the </mark> `updateRestaurantName()` <mark>function definition should not invoke </mark> `useRestaurantName("Little Lemon")`
        
    * The state-setting function's variable name in the array destructuring should not be `setRestaurantName`.
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726471728018/e4a57e5c-4041-4351-8e6b-d036f69be63c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726471751467/b371e8a1-aca1-477b-a830-ef0c25c73550.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726471763481/9504c09a-e092-4bd7-8f58-3b0ebe02ccf5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726471777397/2af82cfe-3bc4-4334-8227-161d17a7d51c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726471791664/a337efb5-3687-4d96-b6ef-9b45bd1aaaef.png align="center")