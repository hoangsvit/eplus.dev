---
title: "Self-review: Create a registration form - Advanced React"
seoTitle: "Self-review: Create a registration form - Advanced React"
seoDescription: "Self-review: Create a registration form - Advanced React"
datePublished: Thu Sep 12 2024 09:23:01 GMT+0000 (Coordinated Universal Time)
cuid: cm0z30cgv001w0aku6gg6aqkq
slug: self-review-create-a-registration-form-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726132843989/3e7a4003-2170-4ffa-b6f6-49df94c09309.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726132968162/9c482781-b2c7-436f-a866-d4162894a025.jpeg
tags: advanced-react, self-review-create-a-registration-form-advanced-react

---

1. **When you need to change the password state, which is stored as an object with two properties,** `value` **and** `isTouched`**, how should you correctly use the** `setPassword` **state setter inside the** `onChange` **event handler?**
    
    * <mark>setPassword({ ...password, value: </mark> [<mark>e.target</mark>](http://e.target)<mark>.value });</mark>
        
    * setPassword({ isTouched: false, value: [e.target](http://e.target).value });
        
    * setPassword({ value: [e.target](http://e.target).value });
        
2. **What’s the correct event prop you should use to determine when an input has been interacted with at least once?**
    
    * onFocus
        
    * <mark>onBlur</mark>
        
    * onChange
        
3. **How do you prevent the default behavior of the form HTML tag in React when a submission event occurs?**
    
    * By returning false from the onSubmit function prop that the form tag provides.
        
    * By calling preventDefault on the event object inside any onChange handler from an input tag.
        
    * <mark>By calling preventDefault on the event object inside the onSubmit function prop from the form tag.</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726132950309/6c456214-2542-4ecf-85c0-490a19301696.png align="center")