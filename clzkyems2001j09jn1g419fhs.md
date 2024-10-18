---
title: "Module quiz: Data and state - React Basic"
seoTitle: "Module quiz: Data and state - React Basic"
seoDescription: "Module quiz: Data and state - React Basic"
datePublished: Thu Aug 08 2024 07:25:40 GMT+0000 (Coordinated Universal Time)
cuid: clzkyems2001j09jn1g419fhs
slug: module-quiz-data-and-state-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723101875425/9f1198d2-3406-4d4d-9c90-12c75c578de2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723101886904/1dc02c02-8f4b-40c4-921a-beef93889e13.png
tags: module-quiz-data-and-state-react-basic

---

1. **In React, data flows in one way: from a parent component to a child component.**
    
    * <mark>True</mark>
        
    * False
        
2. **Why is one-way data flow important in React?**
    
    * <mark>It ensures that the data is flowing from top to bottom in the component hierarchy.</mark>
        
    * It ensures that the data is flowing from bottom to top in the component hierarchy.
        
3. **True or false? State data is the data inside a component that a component can mutate.**
    
    * <mark>True</mark>
        
    * False
        
4. **What is prop drilling?**
    
    * Prop drilling is a situation where you are passing data from a parent to a child component, then to a grandchild component, and so on, until it reaches a more distant component further down the component tree, where this data is required
        
    * <mark>Prop drilling is a situation where you are passing data from a child, to a parent component, then to a grandparent component, and so on, until it reaches a more distant component further up the component tree, where this data is required.</mark>
        
5. **The distinction between stateful and stateless components is that the latter doesn't have its own state.**
    
    * <mark>True</mark>
        
    * False
        
6. **Choose the correct statement.**
    
    * Remember that you should always change the values of props in children components; you should never work with them as they are. In other words, props are mutable.
        
    * <mark>Remember that you should never change the values of props in children components; you should only work with them as they are. In other words, props are immutable.</mark>
        
7. **Is this code valid?**
    
    ```javascript
    function App() {
       const handler = () => console.log('fourth example')
       return ( 
          <div> 
            <button onClick = {handler} >
              Click Me!
            </button>
          </div>
       )
    }
    export default App
    ```
    
    * <mark>Yes</mark>
        
    * No
        
8. **Is this code valid?**
    
    ```xml
    <button onClick={ () => console.log('clicked') }> 
      Click me
    </button>
    ```
    
    * <mark>Yes</mark>
        
    * No
        
9. **Select the correct statement: The useState hook...**
    
    * <mark>... lets you hook into React state and lifecycle features from a component.</mark>
        
    * ...is not part of React; you must import it from a third-party package.
        
    * ... has a convention that if the state variable is named, for example, *counter*, the function to update this counter variable should be named *counterFunction*.
        
    * ... should never be called at the top level of a React component.
        
10. **The Context API allows you to:**
    
    * <mark>Avoid having to pass state down through multiple levels of components.</mark>
        
    * Avoid having to use the return statement in a child component.
        
    * Avoid having to keep your components modular.