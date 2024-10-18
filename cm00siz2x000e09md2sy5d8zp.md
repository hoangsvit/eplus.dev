---
title: "Knowledge check: Rendering Lists in React - Advanced React"
seoTitle: "Knowledge check: Rendering Lists in React - Advanced React"
seoDescription: "Knowledge check: Rendering Lists in React - Advanced React"
datePublished: Mon Aug 19 2024 09:25:24 GMT+0000 (Coordinated Universal Time)
cuid: cm00siz2x000e09md2sy5d8zp
slug: knowledge-check-rendering-lists-in-react-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724059494675/6dc625ea-f55b-4122-b2aa-ce5c03697c9d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724059513321/3f74293c-1e6f-4fc1-8e5f-8a8ba78c7eb1.png
tags: knowledge-check-rendering-lists-in-react-advanced-react

---

1. Imagine you have an array with one object that represents a dessert. You would like to apply some transformation to the item to output a different structure using the **map** function as per the code below. What would be the value of the **newDesserts** variable?
    
    ```javascript
    const desserts = [
      {
        title: 'Chocolate Cake',
        description: 'Chocolate cake is a cake flavored with melted chocolate',
        calories: 500,
      }
    ];
    
    const newDesserts = desserts.map((dessert) => {
      return {
        title: dessert.title.toUpperCase(),
        ...dessert,
        kCal: dessert.calories / 1000,
      };
    });
    ```
    
    * ```javascript
        [
          {
            title: 'CHOCOLATE CAKE',
            description: 'Chocolate cake is a cake flavored with melted chocolate',
            kCal: 0.5,
          }
        ]
        ```
        
    * ```javascript
        [
          {
            title: 'Chocolate Cake',
            description: 'Chocolate cake is a cake flavored with melted chocolate',
            calories: 500,
            kCal: 0.5,
          }
        ]
        ```
        
    * ```javascript
        [
          {
            title: 'CHOCOLATE CAKE',
            description: 'Chocolate cake is a cake flavored with melted chocolate',
            calories: 500,
            kCal: 0.5,
          }
        ]
        ```
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724059207342/9b2dad3d-f726-4620-882a-714d4e6e658f.png align="center")
        
2. **How do you access dynamic data inside the JSX from the** `render` **function?**
    
    * Using local state in the component.
        
    * Using component props.
        
    * <mark>Wrapping the variable in question with curly braces.</mark>
        
3. **What could be a potential problem of using a randomiser function that generates an integer number from 0 to 10 as a key for your list items, having a list of only eight items? Select all that apply**
    
    * <mark>The randomiser function does not entirely guarantee that the keys it generates will be different per item and a collision could happen, having two items with the same integer as keys.</mark>
        
    * <mark>There is no persistence of the keys generated since the moment the component re-renders the keys will vary and that could cause unexpected UI changes.</mark>
        
    * <mark>The randomiser function is a potential performance bottleneck since it has to run every re-render and it’s an unnecessary computation.</mark>
        
4. The `todos` array contains a list of `todo` objects, where each object has an `id` property that is unique. Which of the following code snippets will throw a React warning when opening up the browser console? Select all that apply
    
    * ```javascript
        {todos.map((todo, index) => (
          <ToDo id={todo.id} />
        ))}
        ```
        
    * ```javascript
        {todos.map((todo, index) => (
          <ToDo key={index} id={todo.id} />
        ))}
        ```
        
    * ```javascript
        {todos.map((todo, index) => (
          <ToDo key={todo.id} id={todo.id} />
        ))}
        ```
        
    * ```javascript
        {todos.map((todo, index) => (
          <ToDo key=”myKey” id={todo.id} />
        ))}
        ```
        
5. **What are the potential problems of using indexes as keys?**
    
    * An index is not guaranteed to be unique.
        
    * The index is not persisted and will change the moment the component re-renders.
        
    * <mark>If the order of items may change, that can negatively impact performance and may cause issues with component state.</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724059457537/fb7e9d5c-8683-4cf9-b651-a7a3ad006fb3.png align="center")