---
title: "Knowledge check: React Context - Advanced React"
seoTitle: "Knowledge check: React Context - Advanced React"
seoDescription: "Knowledge check: React Context - Advanced React"
datePublished: Thu Sep 12 2024 09:59:23 GMT+0000 (Coordinated Universal Time)
cuid: cm0z4b4mm000e0al1awrdcksl
slug: knowledge-check-react-context-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726135065268/940641d5-122c-42cc-9edd-81c0b3d9d219.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726135150171/935f2946-308b-4e06-863a-de659836e32a.jpeg
tags: advanced-react, knowledge-check-react-context-advanced-react

---

1. **What of the below scenarios are valid for choosing context instead of local state? Select all that apply.**
    
    * <mark>The locale or language that should be used in the application’s text.</mark>
        
    * The current selection of a group of radio buttons.
        
    * <mark>The visibility state of an alert that overlays into the whole application.</mark>
        
2. **What is the problem of props drilling? Select all that apply.**
    
    * Components not knowing the local state of their parents.
        
    * <mark>Components having to pass down props all the way to the children that need to consume them.</mark>
        
    * <mark>Components receiving more props than they should.</mark>
        
3. **When creating a new piece of application state, what is the bare minimum of React APIs you would need to define it?**
    
    * <mark>Context and local state.</mark>
        
    * Context and props.
        
    * Context, props and local state.
        
4. **What happens when the** `value` **prop of the Context Provider changes?**
    
    * The Context Provider component gets recreated.
        
    * The whole component tree under the Context Provider gets re-rendered.
        
    * <mark>All the consumer components re-render with the updated value.</mark>
        
5. **What happens when you wrap a component with the** `React.memo` **API, such as** `React.memo(Component)`**. Select all that apply.**
    
    * <mark>React provides a performance optimization.</mark>
        
    * The component never gets updated no matter if there was a change in its local state or the props it receives.
        
    * <mark>Whether the component should re-render could be determined by some custom logic that uses the previous props and the current props.</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726135135125/0747f3dd-3909-48d0-8950-e2e4c2304df2.png align="center")