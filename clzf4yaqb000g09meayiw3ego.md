---
title: "Self review: Dynamic events - React Basic"
seoTitle: "Self review: Dynamic events - React Basic"
seoDescription: "Self review: Dynamic events - React Basic"
datePublished: Sun Aug 04 2024 05:42:19 GMT+0000 (Coordinated Universal Time)
cuid: clzf4yaqb000g09meayiw3ego
slug: self-review-dynamic-events-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722749996004/6e9f4f7a-c932-4e6d-8d0f-448c1948e11b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722750129449/ef947884-910f-4366-a1ef-5db5f5ccd870.png

---

1. **In React, you are not allowed to code a separate function that should be run to handle a click event.**
    
    * True
        
    * <mark>False</mark>
        
2. **Event-handling attributes in React are named almost the same as in HTML. Syntactically, the only difference is in the capitalization.**
    
    * <mark>True</mark>
        
    * False
        
3. **What's wrong with this code?**
    
    ```xml
    <button onClick={handleClick()}>
      Click me
    </button>
    ```
    
    * This code should work.
        
    * <mark>You cannot invoke an event-handling function from a JSX expression.</mark>
        
    * The event-handling attribute should be all lowercased.