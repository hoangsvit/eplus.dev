---
title: "Self review: Passing props - React Basic"
seoTitle: "Self review: Passing props - React Basic"
seoDescription: "Self review: Passing props - React Basic"
datePublished: Sun Aug 04 2024 03:27:21 GMT+0000 (Coordinated Universal Time)
cuid: clzf04qx1000409leesg261eq
slug: self-review-passing-props-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722739961363/96e7e3fc-ded8-406d-b616-2c37b8a887a4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722741991460/eaef8c97-f7a4-406f-96e3-2776e7857d5b.png
tags: self-review-passing-props-react-basic

---

1. **True or False: In React, props is an object.**
    
    * <mark>True</mark>
        
    * False
        
2. **True or False: You can pass a prop to a component by adding an attribute to the component being rendered, with the attribute’s value becoming the value of the passed-in prop**
    
    * <mark>True</mark>
        
    * False
        
3. **What is the error in the code below?**
    
    ```javascript
    function Greeting() {
        return <h1>Hello, {props.name}</h1>
    }
    export default Greeting
    ```
    
    * <mark>The Greeting function should receive a </mark> `props` <mark> parameter.</mark>
        
    * You need to add extra spacing after the function's name.
        
    * You should always add a pair of parentheses after the `return` keyword.