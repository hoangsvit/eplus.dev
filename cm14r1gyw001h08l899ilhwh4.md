---
title: "Knowledge check: Reusing behavior - Advanced React"
seoTitle: "Knowledge check: Reusing behavior - Advanced React"
seoDescription: "Knowledge check: Reusing behavior - Advanced React"
datePublished: Mon Sep 16 2024 08:34:35 GMT+0000 (Coordinated Universal Time)
cuid: cm14r1gyw001h08l899ilhwh4
slug: knowledge-check-reusing-behavior-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726475626719/af67e24f-455d-4d8a-9170-d5199ddbb945.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726475666966/0b92dd2f-720f-4fb6-8566-f334dc20d54a.jpeg
tags: advanced-react, knowledge-check-reusing-behavior-advanced-react

---

1. **When dealing with cross-cutting data in your React applications, what are some of the problems of using a custom hook to encapsulate that logic? Select all that apply.**
    
    * <mark>That it turns a stateless component into a stateful one.</mark>
        
    * <mark>The fact that you would have to alter the implementation of each component that needs that specific data.</mark>
        
    * There are no problems at all with hooks, being the best suited tool for the job.
        
2. **Here, you can find the APIs of some higher-order components that have been already implemented. Amongst all the options, which ones present an invalid signature that doesn’t follow the convention? Select all that apply.**
    
    * ```javascript
        withSubscription(() => getData(), Component)
        ```
        
    * ```javascript
        withSubscription(Component, options)
        ```
        
    * ```javascript
        withSubscription(() => getData())(Component)
        ```
        
3. **What are some of the best practices to follow when implementing the higher-order component pattern? Select all that apply.**
    
    * <mark>Maximize composability.</mark>
        
    * Mutate the original component
        
    * <mark>Passed unrelated props through to the Wrapped Component.</mark>
        
    * Always use HOCs and create your enhanced components inside other components.
        
4. **What are some of the differences between higher-order components and render props? Select all that apply.**
    
    * Higher-order components modify the original implementation of the component, whereas the Render Props pattern doesn’t.
        
    * <mark>They inject the new props in the component to be enhanced in a different way.</mark>
        
    * <mark>Render props provide the new data as a function parameter, whereas components wrapped with an HOC get the new data as a new prop.</mark>
        
5. **True or false. A component with a** `render` **prop as renderer can do anything a higher-order component can do.**
    
    * False
        
    * <mark>True</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726475622232/b6f27a27-208c-4732-a585-f386060d7be7.png align="center")