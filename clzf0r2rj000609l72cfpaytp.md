---
title: "Self review: Multiple components - React Basic"
seoTitle: "Self review: Multiple components - React Basic"
seoDescription: "Self review: Multiple components - React Basic"
datePublished: Sun Aug 04 2024 03:44:43 GMT+0000 (Coordinated Universal Time)
cuid: clzf0r2rj000609l72cfpaytp
slug: self-review-multiple-components-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722742941890/12f7fad4-238a-41a2-a7ea-dd8df7213e97.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722743071721/a9c79559-414f-4f42-932f-eac24342b681.png
tags: react-basic, self-review-multiple-components-react-basic

---

1. **True or False: In React, you need to import a component multiple times – as many times as you plan to render it from its parent’s return statement.**
    
    * True
        
    * <mark>False</mark>
        
2. **True or false: You can render more than one child component from the parent component.**
    
    * <mark>True</mark>
        
    * False
        
3. **What is wrong with this code?**
    
    ```javascript
    function App() {
        return (
            <BlogCard />
            <BlogCard />
            <BlogCard />
        )
    }
    ```
    
    * There is no props object passed to the App component.
        
    * <mark>There is no root element.</mark>
        
    * There is no JSX attribute used when rendering the BlogCard components.