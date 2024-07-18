---
title: "Knowledge check: Advanced JavaScript Features"
seoTitle: "Knowledge check: Advanced JavaScript Features"
seoDescription: "Knowledge check: Advanced JavaScript Features"
datePublished: Thu Jul 18 2024 14:31:43 GMT+0000 (Coordinated Universal Time)
cuid: clyrddmpw00010al7dklb40zm
slug: knowledge-check-advanced-javascript-features
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721313048362/9a1dc376-99b5-4da3-aa42-5d1e8df3ec05.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721313064817/28cad413-a84b-4d0a-8054-873d769184b8.png
tags: javascript

---

1. **What will print out when the following code runs?**
    
    ```javascript
    const meal = ["soup", "steak", "ice cream"]
    let [starter] = meal;
    console.log(starter);
    ```
    
    * <mark>soup</mark>
        
    * ice cream
        
    * steak
        
2. **The for-of loop works for Object data types.**
    
    * true
        
    * <mark>false</mark>
        
3. **What will print out when the following code runs?**
    
    ```javascript
    let food = "Chocolate";
    console.log(`My favourite food is ${food}`);
    ```
    
    * <mark>My favourite food is Chocolate</mark>
        
    * My favourite food is ${food}
        
4. **What values will be stored in the set collection after the following code runs?**
    
    ```javascript
    let set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(2);
    set.add(1);
    ```
    
    * 1, 2, 3, 2, 1
        
    * <mark>1, 2, 3</mark>
        
5. **What value will be printed out when the following code runs?**
    
    ```javascript
    let obj = {
        key: 1,
        value: 4
    };
    
    let output = { ...obj };
    output.value -= obj.key;
    
    console.log(output.value);
    ```
    
    * 1
        
    * 2
        
    * <mark>3</mark>
        
    * 4
        
6. **What value will be printed out when the following code runs?**
    
    ```javascript
    function count(...basket) {
        console.log(basket.length)
    }
    
    count(10, 9, 8, 7, 6);
    ```
    
    * 10, 9, 8, 7, 6
        
    * 1, 2, 3, 4, 5
        
    * 6
        
    * <mark>5</mark>