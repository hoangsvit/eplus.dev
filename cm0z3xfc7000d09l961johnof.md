---
title: "Self-review: Create a light-dark theme switcher - Advanced React"
seoTitle: "Self-review: Create a light-dark theme switcher - Advanced React"
seoDescription: "Self-review: Create a light-dark theme switcher - Advanced React"
datePublished: Thu Sep 12 2024 09:48:44 GMT+0000 (Coordinated Universal Time)
cuid: cm0z3xfc7000d09l961johnof
slug: self-review-create-a-light-dark-theme-switcher-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726134481256/826f6535-9e36-4b36-8aac-6a1f449d0537.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726134502767/3d521b63-5aca-49a3-80c8-2438237cd0de.jpeg
tags: advanced-react, self-review-create-a-light-dark-theme-switcher-advanced-react

---

1. **When creating a Provider component, what should you do with the children prop that it receives?**
    
    * Nothing, the children prop is not necessary and can be skipped during the rendering.
        
    * You should clone the children inside the component to add the context value to it.
        
    * <mark>You should wrap the JSX that it returns with a Context Provider component and then pass the children through.</mark>
        
2. **Assuming that the default theme for the application is ‘light’, what should be the default value passed to the** `createContext` **call? Select all that apply.**
    
    * <mark>undefined</mark>
        
    * <mark>null</mark>
        
    * <mark>The string "light"</mark>
        
3. **One of the parts of the context injected into the application is a function called** `toggleTheme`**. Assuming that the theme is held in some local state as a string that can be either ‘light’ or ‘dark’. What should be the exact implementation of the** `toggleTheme` **function?**
    
    * <mark>toggleTheme: () =&gt; setTheme(theme === "light" ? "dark" : "light")</mark>
        
    * toggleTheme: (theme) =&gt; setTheme(!theme)
        
    * toggleTheme: () =&gt; setTheme(theme === "light" ? "light" : "dark")
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726134475720/4f5e59f1-7bc2-4411-a556-4ae18c9fb91b.png align="center")