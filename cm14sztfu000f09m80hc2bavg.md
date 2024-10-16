---
title: "Final graded quiz: Advanced React"
seoTitle: "Final graded quiz: Advanced React"
seoDescription: "Final graded quiz: Advanced React"
datePublished: Mon Sep 16 2024 09:29:17 GMT+0000 (Coordinated Universal Time)
cuid: cm14sztfu000f09m80hc2bavg
slug: final-graded-quiz-advanced-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726478938854/290b4fc1-eb43-4dbc-8fde-7034dc0effce.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726478948954/1b74cb95-eb9a-4ee8-9ede-fd299cdd7a71.jpeg

---

1. You are building a form using both Formik and Yup libraries, where one of the inputs is an email. Before the form gets submitted to the server, you would like to set up some client validation with Yup to make sure the field has an email that is valid, otherwise a message “Invalid email address” would be shown on the screen. This field is also required. Choose the correct validation code from the three code snippets.
    
    * ```javascript
        Yup.string().email("Invalid email address").required("Required")
        ```
        
    * ```javascript
        Yup.email("Invalid email address").required("Required")
        ```
        
    * ```javascript
        Yup.email().string("Invalid email address").required("Required")
        ```
        
2. **You have the following React application where you have a** `ToDo` **component that has two text labels and an uncontrolled text input and the entry point App component that renders a list of two ToDos and a button to reverse the order of the ToDos. To avoid a React keys warning, a key is provided to each** `ToDo` **component, with the index as its value. Suppose that the next sequence of events happen in the application:**
    
    1. You write “Wash the car” in the first `ToDo` input
        
    2. You write “Buy bumper stickers” in the second `ToDo` input
        
    3. You click the button to reverse the order
        
    
    **What would happen on the screen after that?**
    
    ```javascript
    const ToDo = props => (
      <tr>
        <td>
          <label>{props.id}</label>
        </td>
        <td>
          <input />
        </td>
        <td>
          <label>{props.createdAt}</label>
        </td>
      </tr>
    );
    
    
    function App() {
      const [todos, setTodos] = useState([
        {
          id: 'todo1',
          createdAt: '18:00',
        }, 
        {
          id: 'todo2',
          createdAt: '20:30',
        }
      ]);
    
      const reverseOrder = () => {
        // Reverse is a mutative operation, so we need to create a new array first.
        setTodos([...todos].reverse());
      };
    
      return (
        <div>
          <button onClick={reverseOrder}>Reverse</button>
          {todos.map((todo, index) => (
            <ToDo key={index} id={todo.id} createdAt={todo.createdAt} />
          ))}
        </div>
      );
    }
    ```
    
    * todo2 Buy bumper stickers 20:30
        
        todo1 Wash the car 18:00
        
    * <mark>todo2 Wash the car 20:30</mark>
        
        <mark>todo1 Buy bumper stickers 18:00</mark>
        
    * todo1 Buy bumper stickers 18:00
        
        todo2 Wash the car 20:30
        
3. **Consider the code below, and choose the correct sentence about this code.**
    
    ```javascript
    import{ createContext, useContext, useState} from"react";
    
    const ThemeContext = createContext(undefined);
    
    export const ThemeProvider= () => {
      const[theme, setTheme] = useState("light");
    
      return(
        <ThemeContext.Provider
          value={{
            theme,
            toggleTheme: () => setTheme(!theme),
          }}
        >
        </ThemeContext.Provider>
      );
    };
    ```
    
    * <mark>This code has one or more errors in it, and thus needs to be fixed.</mark>
        
    * This code doesn’t have an error and can be ran as is, without errors.
        
4. **Select all the statements that are true for React elements:**
    
    * Each element object should have at least two properties: type and children
        
    * <mark>A tree of elements can mix and match both components and DOM elements as the type property.</mark>
        
    * <mark>The type of an element can be a DOM node, like a HTML button.</mark>
        
    * <mark>The type of an element can be a function corresponding to a React component, like a </mark> `SubmitButton`<mark>.</mark>
        
5. **Assuming you have the following set of components, what would be logged into the console when clicking the Submit button that gets rendered on the screen?**
    
    ```javascript
    const Button = ({ children, ...rest }) => (
      <button onClick={() => console.log("ButtonClick")} {...rest}>
        {children}
      </button>
    );
    
    const withClick = (Component) => {
      const handleClick = () => {
        console.log("WithClick");
      };
    
      return(props) => {
        return<Component {...props} onClick={handleClick} />;
      };
    };
    
    const MyButton = withClick(Button);
    
    export default function App() {
      return <MyButton onClick={() => console.log("AppClick")}>Submit</MyButton>;
    }
    ```
    
    * “ButtonClick”.
        
    * <mark>“WithClick”</mark>
        
    * “AppClick”
        
6. **When writing a test for a React component using jest and react-testing-library, how would you assert that a function has been called with some specific arguments?**
    
    * Using the `toHaveAttribute` matcher.
        
    * Using the `toHaveBeenCalled` matcher.
        
    * <mark>Using the </mark> `toHaveBeenCalledWith` <mark> matcher.</mark>
        
7. **Is the following piece of code a valid implementation of the render props pattern?**
    
    ```javascript
    <MealProvider render={data => (
      <p>Ingredients: {data.ingredients}</p>
    )}/>
    ```
    
    * <mark>Yes</mark>
        
    * No
        
8. **You need the below code snippet to run only after the initial render. What updates (if any) do you need to make to the code?**
    
    ```javascript
    React.useEffect(()=> {
     console.log('The value of the toggle variable is', toggle)
    })
    ```
    
    * <mark>Add an empty dependency array.</mark>
        
    * You shouldn't make any updates.
        
    * You should remove the toggle variable.
        
9. **True or false? In the following component, the** `setRestaurantName` **variable’s value will not be reset between re-renders of the App component.**
    
    ```javascript
    import {useState} from "react";
    
    export default function App() {
      const [restaurantName, setRestaurantName] = useState("Lemon");
    
      function updateRestaurantName() {
        setRestaurantName("Little Lemon");
      };
    
      return (
        <div>
          <h1>{restaurantName}</h1>
          <button onClick={updateRestaurantName}>
            Update restaurant name
          </button>
        </div>
      );
    };
    ```
    
    * <mark>True</mark>
        
    * False
        
10. **Is this valid code?**
    
    ```javascript
    if (data !== '') {
      useEffect(() => {
        setData('test data');
      });
    }
    ```
    
    * <mark>No</mark>
        
    * Yes
        
    
    ---
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726478929889/82283ba0-e23e-4a63-a286-70799db4fbe8.png align="center")