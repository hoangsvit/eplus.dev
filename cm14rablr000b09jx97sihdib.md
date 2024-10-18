---
title: "Self-review: Writing more test scenarios - Advanced React"
seoTitle: "Self-review: Writing more test scenarios - Advanced React"
seoDescription: "Self-review: Writing more test scenarios - Advanced React"
datePublished: Mon Sep 16 2024 08:41:28 GMT+0000 (Coordinated Universal Time)
cuid: cm14rablr000b09jx97sihdib
slug: self-review-writing-more-test-scenarios-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726476059524/1ba98bbc-377d-4a51-afe7-0423fc62df59.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726476078902/4d2f1d8a-baae-461f-8290-f235964d8a18.jpeg
tags: self-review-writing-more-test-scenarios-advanced-react

---

1. **What’s the correct call to fire an** `onChange` **event on an input with react-testing-library’s** `fireEvent` **API?**
    
    * ```javascript
        fireEvent.change(input, { target: { value: 'myValue' } });
        ```
        
    * ```javascript
        fireEvent.change(input, { value: 'myValue' });
        ```
        
    * ```javascript
        fireEvent.onChange(input, { target: { value: 'myValue' } }); 
        ```
        
2. How would you fire a click event on a submit button with react-testing-library `fireEvent` API?
    
    * ```javascript
        fireEvent.onClick(button);
        ```
        
    * ```javascript
        fireEvent.click(button);
        ```
        
    * ```javascript
        fireEvent.onClick(button, { target: { value: 'submit' } });
        ```
        
3. **When locating an element by using one of the screen querying methods from react-testing-library, such as** `screen.getByRole` **or** `screen.getByLabelText`**, what would be the return value of the call if the element is not found?**
    
    * <mark>An error will be thrown</mark>
        
    * null
        
    * undefined
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726476067022/28f0b312-5659-4816-95b0-91b46bed8667.png align="center")