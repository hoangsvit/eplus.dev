---
title: "Knowledge Check - JavaScript in the browser"
seoTitle: "Knowledge Check - JavaScript in the browser"
seoDescription: "Knowledge Check - JavaScript in the browser"
datePublished: Sat Jul 20 2024 04:01:24 GMT+0000 (Coordinated Universal Time)
cuid: clytlqr5f000b08lb6lj78o86
slug: knowledge-check-javascript-in-the-browser
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721448036398/8c182644-9516-47e7-85ef-86bb3c459b74.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721448052230/4f40a685-8686-42e3-a08a-664b2d21bc9a.png

---

1. **In the following code, the type attribute can be omitted.**
    
    ```xml
    <script type="text/javascript">
        //Comment
    </script>
    ```
    
    * <mark>true</mark>
        
    * false
        
2. **What does the document variable return in JavaScript?**
    
    ```javascript
    console.log(document);
    ```
    
    * The entire body tag of the webpage in the browser's memory, as a JavaScript object.
        
    * <mark>The entire webpage in the browser's memory, as a JavaScript object.</mark>
        
    * The HTML code of the downloaded webpage, as a JavaScript string.
        
3. **What does the following function return?**
    
    ```javascript
    getElementById('main-heading')
    ```
    
    * It doesn't return anything.
        
    * All elements that have the class attribute with a value main-heading
        
    * <mark>The first element that has the id attribute with a value main-heading</mark>
        
    * The last element that has the id attribute with a value main-heading
        
4. **After the following code is run, what will happen when the user clicks on a p element in the browser?**
    
    ```javascript
    document.querySelector('h1').addEventListener('click', function() { 
        console.log('clicked');
    });
    ```
    
    * 'clicked' is printed to the console log.
        
    * <mark>Nothing.</mark>
        
5. **What will be printed when the following code runs?**
    
    ```javascript
    var result = {
        value: 7
    };
    console.log(JSON.stringify(result));
    ```
    
    * {}
        
    * {value: 7}
        
    * <mark>{"value": 7}</mark>