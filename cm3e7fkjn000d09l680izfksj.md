---
title: "Module quiz: Securing an API in Django REST framework"
seoTitle: "Module quiz: Securing an API in Django REST framework"
seoDescription: "Module quiz: Securing an API in Django REST framework"
datePublished: Tue Nov 12 2024 08:42:47 GMT+0000 (Coordinated Universal Time)
cuid: cm3e7fkjn000d09l680izfksj
slug: module-quiz-securing-an-api-in-django-rest-framework
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731400936454/b8dc40ba-70a5-4b4f-a62a-f749d0b65a6e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731400947364/44d7d0ac-37dd-4571-a1d2-2525824df48a.png
tags: module-quiz-securing-an-api-in-django-rest-framework

---

1. **In what way can you validate the** `price` **field to not be less than 5 in a serializer?** *Choose all that apply.*
    
    * <mark>By using a validate method</mark>
        
    * <mark>By adding this line of code in the serializer:</mark>
        
        ```apache
        price = serializers.DecimalField(max_digits=6, decimal_places=2, min_value=5)
        ```
        
    * By using a validate\_price\_lt method
        
    * By using a validation method
        
    * <mark>By adding</mark>
        
        ```apache
        'price': {'min_value': 5} in the extra_kwargs section
        ```
        
2. **How can you limit an API endpoint in such a way that only** `POST, PUT, PATCH` **and** `DELETE` **calls will be throttled, but GET calls will not be throttled?** Choose all that apply.
    
    * <mark>By writing a custom throttle class and overriding the </mark> `get_throttles` <mark> method</mark>
        
    * <mark>By writing a custom throttle class and using it inside a @throttle_classes decorator.</mark>
        
    * By writing a scoped throttle class and set it up in the [`settings.py`](http://settings.py) file
        
    * This cannot be done
        
3. **For token-based authentication, you need to install the Djoser library because DRF doesn’t support such authentications by default.**
    
    * True
        
    * <mark>False</mark>
        
4. **How can you enable support for sorting the API output by two fields: age and gender?**
    
    * By manually parsing the query string
        
    * <mark>By adding this line of code</mark>
        
        ```apache
        ordering_fields=['age','gender'] in a class-based view 
        ```
        
    * By adding this `@ordering_fields(['age','gender'])` above a function-based view
        
    * No code change is required. Just add `‘OrderingFilter'` in the [settings.py](http://settings.py) file and DRF will process it automatically.
        
5. **Which of the following are valid endpoints automatically created by Djoser?**
    
    * <mark>/users/</mark>
        
    * <mark>/users/me/</mark>
        
    * /user/confirm/
        
    * /user/me/
        
    * /user/
        
6. **You can manually expire a JWT access token any time you want.**
    
    * <mark>True</mark>
        
    * False
        
7. **How can you assign users to a user group?** Choose all that apply.
    
    * <mark>From the Django admin panel</mark>
        
    * By making a call to /users/groups endpoint
        
    * Using Djoser library
        
    * <mark>By using the user_set.add() method in a Group object</mark>
        
    * <mark>By manually modifying the database records</mark>
        
8. **Which of the following prefixes should you use to successfully authenticate a token using SimpleJWT library?**
    
    * Auth Token
        
    * Token
        
    * Auth
        
    * <mark>Bearer</mark>
        
9. **What happens when you blacklist a JWT refresh token?**
    
    * It cannot be used to generate new refresh tokens
        
    * It blocks the user who bears this token
        
    * It expires
        
    * <mark>It cannot be used to generate new access tokens anymore.</mark>
        
    * It also blacklists the access token
        
10. **Which of the following prefixes must you use with tokens to successfully authenticate an API call in plain DRF?**
    
    * Auth
        
    * Auth Token
        
    * Bearer
        
    * <mark>Token</mark>
        
11. **Which external package can you use to sanitize HTML tags from user input data?**
    
    * Cleaner
        
    * <mark>Bleach</mark>
        
    * Sanitizer
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731400899428/80fe7f67-e2ce-430a-9d61-790c7d8c667e.png align="center")