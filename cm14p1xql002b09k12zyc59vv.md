---
title: "Self-review: Build a Radio Group Component - Advanced React"
seoTitle: "Self-review: Build a Radio Group Component - Advanced React"
seoDescription: "Self-review: Build a Radio Group Component - Advanced React"
datePublished: Mon Sep 16 2024 07:38:57 GMT+0000 (Coordinated Universal Time)
cuid: cm14p1xql002b09k12zyc59vv
slug: self-review-build-a-radio-group-component-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726472306885/0ab1759d-48c4-4299-ae98-d62f8377330c.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726472329039/619d44f4-29aa-49c8-9f24-d08e9a35af22.jpeg

---

1. **In the** `RadioGroup` **component, when cloning each** `child` **element (**`RadioOption`**), what’s the condition that determines the value of the new** `checked` **prop that gets merged into the existing props of each** `RadioOption` **component? Recall that the** `RadioGroup` **component has three props -** `onChange`**,** `selected` **and** `children` **- and that each** `RadioOption` **component receives two props -** `value` **and** `children`**.**
    
    * ```javascript
        React.cloneElement(child, {
          onChange,
          checked: child.props.value === selected,
        });
        ```
        
    * ```javascript
        React.cloneElement(child, {
          onChange,
          checked: child.checked === true,
        });
        ```
        
    * ```javascript
        React.cloneElement(child, {
          onChange,
          checked: child.props.selected,
        });
        ```
        
2. **Inside the** `RadioOption` **component, what should be the value of the** `onChange` **prop from the** `radio` **input element? Recall that the** `RadioOption` **component receives four props -** `value, checked, onChange` **and** `children`**.**
    
    * ```xml
        <input type="radio" onChange={e => onChange(e.target.value)} />
        ```
        
    * ```xml
        <input type="radio" onChange={props.onChange} />
        ```
        
    * ```xml
        <input type="radio" onChange={props.onChange} />
        ```
        
3. **What are the arguments that the** `React.Children.map` **function receives?**
    
    * The first argument is the children prop, and there is no second argument.
        
    * <mark>The first argument is the children prop, and the second argument is a transformation function that returns a new React element.</mark>
        
    * The first argument is the children prop, and the second argument is a predicate function that returns a boolean.
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726472301828/91ad5290-6fd2-4552-824f-f520866632a1.png align="center")