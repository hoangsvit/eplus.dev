---
title: "Knowledge check: JSX - Advanced React"
seoTitle: "Knowledge check: JSX - Advanced React"
seoDescription: "Knowledge check: JSX - Advanced React"
datePublished: Mon Sep 16 2024 08:09:42 GMT+0000 (Coordinated Universal Time)
cuid: cm14q5h3e000s0al74iocdtep
slug: knowledge-check-jsx-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726474058716/e4994f6a-2777-4366-a4d3-e7e6f30e82ea.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726474127419/7f53ccab-aee3-4cf6-aa04-1fa2dbff79bd.jpeg
tags: knowledge-check-jsx-advanced-react

---

1. **Let’s suppose you have the below JSX that gets returned from a component, what would be the equivalent object representation (Element) that React will create internally?**
    
    ```xml
     <button className='button-primary'>
        <div>
            Submit
        </div>
     </button>
    ```
    
    * ```javascript
        {
            type: "button",
            props: {
                className: "button-primary",
                children: {
                    type: "div",
                    children: "Submit"
                },
            },
        }
        ```
        
    * ```javascript
        {
            type: "button",
            props: {
                className: "button-primary",
                children: {
                    type: "div",
                    props: {
                        children: "Submit",
                    } 
                },
            },
        }
        ```
        
    * ```javascript
         {
            type: Button,
            props: {
                className: "button-primary",
                children: "div",
            },
        }
        ```
        
2. **What is the concept of component specialization?**
    
    * <mark>A component defined as a special case of another more generic component.</mark>
        
    * A component that is designed to fulfill one specific purpose and nothing else.
        
    * A component that doesn’t know its children ahead of time and acts as a generic box.
        
3. **You would like to clone a React element by using the** `React.cloneElement` **API, where the particular element has the below structure:**
    
    ```javascript
    const buttonElement = {
      type: SubmitButton,
      props: {
        color: "green",
        children: "Submit!",
      },
    };
    ```
    
    **What would be the value of the variable output when using the API with the following parameters?**
    
    ```javascript
    const output = React.cloneElement(buttonElement, {disabled: true, color: “blue” });
    ```
    
    * ```javascript
        {
          type: SubmitButton,
          props: {
            color: "blue",
            children: "Submit!",
            disabled: true,
          },
        };
        ```
        
    * ```javascript
        {
          type: SubmitButton,
          props: {
            disabled: true,
            color: "blue",
          },
        };
        ```
        
    * ```javascript
        {
          type: SubmitButton,
          props: {
            color: "green",
            children: "Submit!",
            disabled: true,
          },
        };
        ```
        
4. **Imagine you are using the spread operator in the below component as follows:**
    
    ```javascript
    const props = { title: "tiramisu", cal: 400 };
    const element = <Component title="cake" {...props} cal={500} />;
    ```
    
    **What would be the value of** `element.props`**?**
    
    * ```javascript
        { title: "cake", cal: 500 }
        ```
        
    * ```javascript
        { title: "cake", cal: 400 }
        ```
        
    * ```javascript
        { title: "tiramisu", cal: 500 }
        ```
        
    * ```javascript
        { title: "tiramisu", cal: 400 }
        ```
        
5. **Amongst the below expressions, select all that will not render anything on the screen when being used in JSX.**
    
    * ```xml
        <div>{false}</div>
        ```
        
    * ```xml
        <div>{undefined}</div> 
        ```
        
    * ```xml
        <div>{null}</div>
        ```
        
    * ```xml
        <div>{(() => true)()}</div>
        ```
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726474045409/945abdc3-e12b-4a71-9c16-567c00d844b7.png align="center")