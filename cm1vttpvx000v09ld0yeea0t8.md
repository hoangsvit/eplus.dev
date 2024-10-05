---
title: "Knowledge check: Adding components"
seoTitle: "Knowledge check: Adding components"
seoDescription: "Knowledge check: Adding components"
datePublished: Sat Oct 05 2024 07:22:19 GMT+0000 (Coordinated Universal Time)
cuid: cm1vttpvx000v09ld0yeea0t8
slug: knowledge-check-adding-components
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728112265946/aca413ad-74c5-4370-a801-e6b3bf52aebc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1728112926105/7c6c63a8-df93-49fc-9ee0-efe6ef615a36.png
tags: knowledge-check-adding-components

---

1. **Choose the correct statement about the following code:** 
    
    ```xml
    <>  
        <h1>...</h1>  
    
        <p>...</p>  
    </>
    ```
    
    * <mark>This is valid React code.&nbsp;</mark> 
        
    * This is not valid React code
        
    * This is valid JavaScript code
        
    * This is a valid HTML tag
        
2. **In React, you can only have one root element in a component.**
    
    * True
        
    * <mark>False</mark>
        
3. **Which of the following statements are true about JSX?**
    
    Choose all that apply. 
    
    * <mark>JSX allows you to use JavaScript functions as attributes</mark>
        
    * <mark>JSX allows you to include expressions in your code.</mark>
        
    * JSX elements must be written in all uppercase. 
        
    * JSX elements must be self-closing.
        
    * <mark>JSX elements can have multiple children.</mark>
        
4. What is the output of the following JSX code block?
    
    ```javascript
    const myList = ['apple', 'banana', 'orange']; 
    const listItems = myList.map((item) => 
      <li key={item}>{item}</li> 
    ); 
    return ( 
      <ul>{listItems}</ul> 
    );
    ```
    
    * ```xml
        <li>apple</li><li>banana</li><li>orange</li>
        ```
        
    * ```xml
        <ul> [<li>apple</li>, <li>banana</li>, <li>orange</li>] </ul>
        ```
        
    * ```xml
        [<ul>,<li>apple</li>, <li>banana</li>, <li>orange</li>,<ul>]
        ```
        
    * ```xml
        <ul><li>apple</li><li>banana</li><li>orange</li></ul>
        ```
        
5. **Which of the following is true about props in React?**
    
    * <mark>Props should be used for values that will not change within a component.</mark>
        
    * The prop value must be wrapped in quotes.
        
    * Props should only be used for simple data types, such as strings and numbers.
        
    * Props are mutable and can be changed within a component.
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1728112887436/a7974c63-ad35-4b72-acbf-e6c4f76f2ba6.png align="center")