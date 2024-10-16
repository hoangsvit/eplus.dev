---
title: "Knowledge check: Form submission"
seoTitle: "Knowledge check: Form submission"
seoDescription: "Knowledge check: Form submission"
datePublished: Sun Jul 21 2024 13:20:02 GMT+0000 (Coordinated Universal Time)
cuid: clyvl4zx9000009joaffo5w6l
slug: knowledge-check-form-submission
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721567559515/63944cbe-48a5-4cec-9ee5-31ad76747bf1.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721567985242/3ec5f290-2234-4a52-ba89-9b975ebf35ba.png

---

1. **Which form attribute is used to specify the address to which the form data will be submitted to?**
    
    * method
        
    * <mark>action</mark>
        
    * src
        
2. Which HTTP method will be used to send data for the following form?
    
    ```xml
    <form>
          <button type="submit">Submit</button>
    </form>
    ```
    
    * DELETE
        
    * POST
        
    * PUT
        
    * <mark>GET</mark>
        
3. **When using the HTTP POST method to submit form data, how is the data transmitted to the server?**
    
    * Via the address in the URL bar of the web browser
        
    * <mark>Via the body of the HTTP request</mark>
        
4. Your web browser is currently at the address `https://meta.com/profile`. When the following form is submitted, what address will it submit to?
    
    ```xml
    <form>
          <button type="submit">Submit</button>
    </form>
    ```
    
    * **https://meta.com/login**
        
    * **https://meta.com**
        
    * **<mark>https://meta.com/profile</mark>**
        
5. Your web browser is currently at the address `https://meta.com/profile`. When the following form is submitted, what address will it submit to?
    
    ```html
    <form action="/login">
           <button type="submit">Submit</button>
    </form>
    ```
    
    * **https://meta.com**
        
    * **<mark>https://meta.com/login</mark>**
        
    * **https://meta.com/profile/login**
        
    * **https://meta.com/profile**
        
6. **Your web browser is currently at the address** `https://meta.com/profile`**. When the following form is submitted, what address will it submit to?**
    
    ```xml
    <form action="login">
           <button type="submit">Submit</button>
    </form>
    ```
    
    * **https://meta.com/profile**
        
    * **https://meta.com/login**
        
    * **https://meta.com**
        
    * **<mark>https://meta.com/profile/login</mark>**
        
7. **The HTTP DELETE method can be used for form submission.**
    
    * True
        
    * <mark>False</mark>
        
8. **There are several ways to secure transmitting form data to the web server. Which of the following will help secure the data? Select all that apply.**
    
    * <mark>Send the data using HTTPS</mark>
        
    * Send the data using the HTTP GET method
        
    * <mark>Send the data using the HTTP POST method</mark>