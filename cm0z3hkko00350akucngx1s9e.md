---
title: "Knowledge check: Forms in React - Advanced React"
seoTitle: "Knowledge check: Forms in React - Advanced React"
seoDescription: "Knowledge check: Forms in React - Advanced React"
datePublished: Thu Sep 12 2024 09:36:24 GMT+0000 (Coordinated Universal Time)
cuid: cm0z3hkko00350akucngx1s9e
slug: knowledge-check-forms-in-react-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726133740481/a506f761-a084-4e25-b958-86852085c268.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726133768936/c4694542-2485-4457-aca7-09c1acc8500e.jpeg
tags: advanced-react, knowledge-check-forms-in-react-advanced-react

---

1. **What of the next input types doesn’t have a controlled version when they are used in React?**
    
    * &lt;textarea /&gt;
        
    * &lt;input type=”text” /&gt;
        
    * <mark>&lt;input type=”file” /&gt;</mark>
        
2. **What are some of the features of controlled components? Select all that apply**
    
    * Validating all values in the client side when a submission occurs in the form, before calling the server endpoint.
        
    * <mark>Enforcing a specific input format.</mark>
        
    * <mark>Conditionally disabling the submit button.</mark>
        
3. **How do you get the value of an input when its state is handled by the DOM (Uncontrolled)? Select all that apply.**
    
    * Using a combination of `useEffect` and `useRef` hooks, where a ref is used on the uncontrolled input and then its value can be read on `useEffect` after a re-render cycle happens.
        
    * <mark>Using a ref via </mark> `useRef` <mark> hook, assigning it to the input and then reading the input value when the submission happens via </mark> `ref.current.value`<mark>.</mark>
        
    * Using local state and initializing it to an empty string. Then, reading the input value from the event object when the submission happens and finally setting the local state with that value.
        
4. **What happens when you click on the submit button in the below code snippet?**
    
    ```xml
    <form onSubmit={() => alert("Submitting")}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input type="button" value="Submit" />
    </form>
    ```
    
    * The `onSubmit` callback is executed and an alert is shown with the text "Submitting".
        
    * An error is thrown.
        
    * <mark>Nothing happens when the button is clicked.</mark>
        
5. **What is missing in the below code for the select component to work properly?**
    
    ```xml
    <select onChange={handleChange}>
      <option value="grapefruit">Grapefruit</option>
      <option value="lime">Lime</option>
      <option value="coconut">Coconut</option>
      <option value="mango">Mango</option>
     </select>
    ```
    
    * Each `option` tag should be accompanied by a `label` tag.
        
    * Each `option` tag should have an `onChange` handler.
        
    * <mark>The </mark> `select` <mark> tag is missing a </mark> `value` <mark> prop.</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726133749905/4e6be772-b0b2-4d8e-9cc1-88b2529b2ca3.png align="center")