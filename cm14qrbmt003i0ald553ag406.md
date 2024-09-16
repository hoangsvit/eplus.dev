---
title: "Self-review: Implementing scroller position with render props - Advanced React"
seoTitle: "Self-review: Implementing scroller position with render props"
seoDescription: "Self-review: Implementing scroller position with render props - Advanced React"
datePublished: Mon Sep 16 2024 08:26:41 GMT+0000 (Coordinated Universal Time)
cuid: cm14qrbmt003i0ald553ag406
slug: self-review-implementing-scroller-position-with-render-props-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726475173918/cdacbdee-6987-44a5-a11c-b31b098e5e56.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726475190213/99cb52ea-ab0b-4e7d-8528-493e3073c34e.jpeg
tags: advanced-react, self-review-implementing-scroller-position-with-render-props-advanced-react

---

1. **Considering the** `MousePosition` **component receives a prop called** `render`**, which is a function, what are valid options of JSX returned from the component?**
    
    * ```javascript
        return render(<div>{mousePosition}</div>);
        ```
        
    * ```javascript
        return (
          <div>
            render({mousePosition})
          </div>
        );
        ```
        
    * ```javascript
        return render({ mousePosition });
        ```
        
2. **The** `PointMouseLogger` **component returns the below JSX.**
    
    ```xml
    <p>
     ({mousePosition.x}, {mousePosition.y})
    </p>
    ```
    
    **After incorporating the** `MousePosition` **component as part of the JSX returned by** `PointMouseLogger`**, what should be the new JSX that** `PointMouseLogger` **returns?**
    
    * ```javascript
        return(
          <MousePosition>
            {({ mousePosition }) => (
              <p>
                ({mousePosition.x}, {mousePosition.y})
              </p>
            )}
          </MousePosition>
        );
        ```
        
    * ```javascript
        return(
          <MousePosition>
            {({ mousePosition }) => (
              <p>
                ({mousePosition.x}, {mousePosition.y})
              </p>
            )}
          </MousePosition>
        );
        ```
        
    * ```javascript
        return(
          <MousePosition
            render={({ mousePosition }) => (
              <p>
                ({mousePosition.x}, {mousePosition.y})
              </p>
            )}
          />
        );
        ```
        
3. **The App component initially presents the below output structure**
    
    ```javascript
    function App() {
      return(
        <div className="App">
          <header className="Header">Little Lemon Restaurant 🍕</header>
          <PanelMouseLogger />
          <PointMouseLogger />
        </div>
      );
    }
    ```
    
    **After adding the MousePosition component into the mix, would you still have to perform any changes to the App component?**
    
    * Yes
        
    * <mark>No</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726475168705/99f94a15-40cf-4f93-a46d-17614e02de63.png align="center")