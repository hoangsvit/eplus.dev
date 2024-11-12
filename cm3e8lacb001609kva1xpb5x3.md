---
title: "Django Web Framework - Final graded quiz: APIs"
seoTitle: "Django Web Framework - Final graded quiz: APIs"
seoDescription: "Django Web Framework - Final graded quiz: APIs"
datePublished: Tue Nov 12 2024 09:15:13 GMT+0000 (Coordinated Universal Time)
cuid: cm3e8lacb001609kva1xpb5x3
slug: django-web-framework-final-graded-quiz-apis
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731402871463/362ecff2-1226-4294-9259-a11657f27a21.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731402901545/bcf4449f-1f1d-431d-8725-d90819cccd3d.png
tags: django-web-framework, django-web-framework-final-graded-quiz-apis, final-graded-quiz-apis

---

1. **To accept a** `GET, PUT, POST` **and** `DELETE` **call, which generic view do you need to extend in your class-based view?**
    
    * <mark>RetrieveUpdateDestroyAPIView</mark>
        
    * CreateAPIView
        
    * RetrieveUpdateAPIView
        
    * ListCreateAPIView
        
2. **Which of the following decorator functions can be used to display the browsable API view from a function-based view?**
    
    * No decorator is needed, DRF handles this automatically.
        
    * throttle\_classes() decorator
        
    * <mark>api_view() decorator</mark>
        
    * permission\_classes() decorator
        
3. **A model has two fields –** `id` **and** `title`**. When linked from the serializers, this model always shows the value of the id field. To display the value of the** `title` **field instead of the** `id` **field, you need to override the \_\_\_\_\_\_\_\_\_\_ method inside the model class.**
    
    * <mark>str</mark>
        
    * id
        
    * repr
        
    * title
        
    * This is not possible
        
4. **PascaleCase is the ideal naming convention for writing API endpoint names.**
    
    * True
        
    * <mark>False</mark>
        
5. **How can you keep project dependencies isolated from other projects and avoid conflicts?**
    
    * <mark>Use a virtual environment</mark>
        
    * Use a Piplock file
        
    * Use a global environment
        
    * Use a requirements.txt file
        
6. **Which signing mechanism is used to sign an API call?**
    
    * TOKEN
        
    * JWT
        
    * <mark>HMAC</mark>
        
    * SHA
        
7. **A watchlist is used to pause the code execution on a specific line and check the values of the current variables.**
    
    * True
        
    * <mark>False</mark>
        
8. **Djoser automatically creates authentication and authorization API endpoints in the DRF based API projects.**
    
    * True
        
    * <mark>False</mark>
        
9. **You are working on a project where the API client needs to send two fields with their values –** `email` **and** `confirmation_email`**. As an API developer, you need to check if the value for both these fields are the same before saving the email address in the database. How can you do that? Choose all that apply.**
    
    * This can be done using the `UniqueTogetherValidator` class in the model
        
    * This can be done using the `UniqueTogetherValidator` class in the serializer
        
    * This can be done using the `UniqueTogetherValidator` class in the view file
        
    * This can be done using the `UniqueValidator` class in the serializer
        
    * <mark>This can be done in the serializer by using the </mark> `validate()` <mark> method</mark>
        
10. **What are the benefits of caching?** Choose all that apply.
    
    * <mark>Less load on the database</mark>
        
    * Increased security
        
    * <mark>Save bandwidth and network resources</mark>
        
    * <mark>Less load on the web server</mark>
        
    * <mark>Reduced infrastructure bills</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731402845103/7c6bb991-a972-4492-921e-f6d555e9ede0.png align="center")