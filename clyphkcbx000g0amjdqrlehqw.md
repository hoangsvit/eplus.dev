---
title: "Knowledge check - Conditionals and loops in Javascript"
seoTitle: "Knowledge check - Conditionals and loops in Javascript"
seoDescription: "Knowledge check - Conditionals and loops in Javascript"
datePublished: Wed Jul 17 2024 06:53:22 GMT+0000 (Coordinated Universal Time)
cuid: clyphkcbx000g0amjdqrlehqw
slug: knowledge-check-conditionals-and-loops-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721199194949/a190d0a2-c5d6-4697-ab30-26a70c220c9b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721199186757/977bee73-ff59-42d9-b995-5ad25cfe8a05.png
tags: javascript

---

1. **Based on the following code, what will print out when the variable i has the value 3 ?**
    
    ```javascript
      if(i < 5) {
        console.log("Hello");
      } else {
        console.log("Goodbye");
      }
    ```
    
    * <mark>Hello</mark>
        
    * Goodbye
        
2. **Based on the following code, what will print out when the variable i has the value 1 ?**
    
    ```javascript
      if(i == 0 && i == 1) {
        console.log("Hello");
      } else {
        console.log("Goodbye");
      }
    ```
    
    * Hello
        
    * <mark>Goodbye</mark>
        
3. **How many times will the following code print the word 'Hello'?**
    
    ```javascript
      for (i = 0; i < 2; i++) {
          console.log("Hello");
      }
    ```
    
    * 1
        
    * <mark>2</mark>
        
    * 3
        
    * 4
        
4. **How many times will the following code print the word 'Hello'?**
    
    ```javascript
      var i = 0;
      while(i < 3) {
        console.log("Hello");
        i++;
      }
    ```
    
    * 1
        
    * 2
        
    * <mark>3</mark>
        
    * 4
        
5. **How many times will the following code print the word 'Hello'?**
    
    ```javascript
      for (i = 0; i < 2; i++) {
          for (var j = 0; j < 3; j++) {
              console.log("Hello");
          }
      }
    ```
    
    * <mark>2</mark>
        
    * 3
        
    * 4
        
    * 6
        
6. **Based on the following code, what will print out when the variable i has the value 7 ?**
    
    ```javascript
      if(i <= 5) {
        console.log("Hello");
      } else if(i <= 10) {
        console.log("Goodnight");
      } else {
        console.log("Goodbye");
      }
    ```
    
    * Hello
        
    * <mark>Goodnight</mark>
        
    * Goodbye
        
7. **Based on the following code, what will print out when the variable i has the value 3 ?**
    
    ```javascript
      switch(i) {
        case 1:
          console.log("Hello");
          break;
        case 2:
          console.log("Goodnight");
          break;
        case 3:
          console.log("Goodbye");
          break;
      }
    ```
    
    * Hello
        
    * Goodnight
        
    * <mark>Goodbye</mark>
        
8. **Based on the following code, what will print out when the variable i has the value 3 ?**
    
    ```javascript
      if(i == 2 || i == 3) {
        console.log("Hello");
      } else {
        console.log("Goodbye");
      }
    ```
    
    * <mark>Hello</mark>
        
    * Goodbye