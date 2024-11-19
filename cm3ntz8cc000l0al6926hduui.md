---
title: "Back-End Developer Capstone - Final Graded Assessment"
seoTitle: "Back-End Developer Capstone - Final Graded Assessment"
seoDescription: "Back-End Developer Capstone - Final Graded Assessment"
datePublished: Tue Nov 19 2024 02:23:51 GMT+0000 (Coordinated Universal Time)
cuid: cm3ntz8cc000l0al6926hduui
slug: back-end-developer-capstone-final-graded-assessment
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731983006814/64bc3fe1-a18a-49d9-be88-3af6decec107.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731983022583/c5889f65-67da-4472-8a77-2cb1a1d8d537.png
tags: back-end-developer-capstone, back-end-developer-capstone-final-graded-assessment, final-graded-assessment

---

1. **Complete the following sentence. The** `APIView` **class in the Django REST framework acts as \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_.**
    
    * an API policy decorator for function-based views
        
    * a base class for generic views
        
    * <mark>a base class for class-based views</mark>
        
    * a decorator with HTTP method parameters for function-based views
        
2. **Which of the following options can you use to clone a GitHub repository?** Select all that apply.
    
    * <mark>You can clone a GitHub repository with the GitHub Desktop app.</mark>
        
    * <mark>You can use the </mark> `git clone` <mark> command in the Git terminal.</mark>
        
    * <mark>You can download a GitHub repository as a ZIP file.</mark>
        
    * You can clone a GitHub repository with GitHub's web interface.
        
3. **Which template tag is necessary to serve the static files in the template?**
    
    * {% load "/static " %}
        
    * <mark>{% load static %}</mark>
        
    * {% static %}
        
    * {% include static %}
        
4. **True or False: A** `ModelSerializer` **maps closely to model definitions in a Django app.**
    
    * <mark>True</mark>
        
    * False
        
5. **Which of the following base endpoints are available when you use Djoser for authenticating a DRF API?** Select all that apply.
    
    * <mark>/users/me/</mark>
        
    * /users/create/
        
    * /users/login/
        
    * <mark>/users/</mark>
        
6. **How does a** `ViewSet` **handle the HTTP requests? Select all that apply.**
    
    * You can write a separate `ViewSet` class for each type of HTTP request.
        
    * <mark>You may implement methods like </mark> `create()` <mark> and </mark> `list()` <mark> to handle request methods such as </mark> `POST` <mark> and </mark> `GET`<mark>.</mark>
        
    * <mark>The </mark> `ViewSet` <mark> internally creates URL routes for each HTTP call.</mark>
        
    * You provide separate methods `get()` or `post()` inside the class.
        
7. **How can you obtain an authorization token for a user in the DRF API?** Select all that apply.
    
    * <mark>Using the </mark> `djoser` <mark> endpoint </mark> `/token/login/`<mark>.</mark>
        
    * <mark>Using Django's Admin interface.</mark>
        
    * <mark>By invoking the </mark> `obtain_auth_token` <mark> view.</mark>
        
    * Using the `djoser` endpoint `/token/create/`.
        
8. **True or False:** `TokenAuthentication` **is more secure than** `SessionAuthentication`**.**
    
    * True
        
    * <mark>False</mark>
        
9. **How can you check which git branch you are currently checked out to?** Select all that apply.
    
    * <mark>By using the </mark> `git branch` <mark> command.</mark>
        
    * By using the `git checkout` command.
        
    * <mark>By using the </mark> `git status` <mark> command.</mark>
        
    * By using the `git list` command.
        
10. **What are the similarities between the project-level** [`urls.py`](http://urls.py) **file and the app-level** [`urls.py`](http://urls.py) **file?** Select all that apply.
    
    * <mark>You can register the </mark> `viewset` <mark> URLs in both files.</mark>
        
    * <mark>Both have a list object called </mark> `urlpatterns` <mark> defined.</mark>
        
    * You can register the admin app in both.
        
    * You can use both of them to set the `ROOT_CONF` variable in the [`settings.py`](http://settings.py) file.
        
11. **When defining a model, sometimes there is a field in the model that is used as a unique identifier in another model, used to create relationships between them. This is called what?**
    
    * CharField
        
    * <mark>Foreign Key</mark>
        
    * Primary Key
        
    * Relationship
        
12. **When building a model in Django, first we create the model and then run** [`manage.py`](http://manage.py) `makemigrations`**. What does this do?**
    
    * Creates the model as a table in SQL.
        
    * Creates a new database and readies it to receive data.
        
    * <mark>Creates the migration scripts to be run.</mark>
        
    * Shows all of the migrations that have been created.
        
13. **Once Python is installed and a virtual environment is set up, what is the command to install Django into the currently active environment?**
    
    * pip3 django-install
        
    * django-admin install django
        
    * python3 install django
        
    * <mark>pip3 install django</mark>
        
14. **When the ORM is used in Django to run a query against the database, what format are the results returned in?**
    
    * XML
        
    * JSON
        
    * <mark>QuerySet</mark>
        
    * HTML
        
15. **To help users with completing a form, some text can be defined to provide guidance on how to complete a specific field. What property is used to define this?**
    
    * label
        
    * <mark>help_text</mark>
        
    * required
        
    * initial
        
16. **When models are created and registered in Django and all the migrations are properly run, how are initial permissions created in Django Admin?**
    
    * The model must specifically define the permissions.
        
    * An additional command must be run from the command line.
        
    * A “staff” user must login to Django Admin and create them.
        
    * <mark>They are create automatically.</mark>
        
17. **What is the modern, native API used in Javascript used to interact with APIs?**
    
    * Axios
        
    * XMLHttpRequest
        
    * jQuery
        
    * <mark>fetch</mark>
        
18. **On an existing HTML page, all** `<h2>` **tags on the page need to be updated with content retrieved from a database. What Javascript code would be used to select all** `<h2>` **tags?**
    
    * document.get(‘h2)
        
    * page.selec[t](http://page.select)(‘h2’)
        
    * document.querySelector(‘h2’)
        
    * <mark>document.querySelectorAll(‘h2’)</mark>
        
19. **What SQL command would be used to remove all records from a table while leaving the structure of the table intact?**
    
    * DROP
        
    * <mark>TRUNCATE</mark>
        
    * ALTER
        
    * UPDATE
        
20. **What part of a conditional statement is only executed when no other conditions in the statement are met?**
    
    * <mark>else</mark>
        
    * if
        
    * except
        
    * elif
        
21. **If an object is created inside of a function in Javascript, it is a member of which scope?**
    
    * global
        
    * block
        
    * class
        
    * <mark>local</mark>
        
22. **A request is made to an API endpoint. The URL contains information needed to determine some business logic on the back end. What property of the request object can be used to get this information?**
    
    * <mark>path</mark>
        
    * FILES
        
    * COOKIES
        
    * user
        
23. **What special character matches zero or more characters while using Regular Expressions?**
    
    * `*` <mark> (asterisk or star)</mark>
        
    * `#` (hash)
        
    * `^` (caret)
        
    * `+` (plus)
        
24. **If the web server is taking a long time to respond to a request and seems to have failed, an error in which range may be displayed?**
    
    * 100-199
        
    * <mark>500-599</mark>
        
    * 400-499
        
    * 200-299
        
25. **Which of the following are scopes in Python? Select all that apply.**
    
    * Block
        
    * Enclosed
        
    * <mark>Built-in</mark>
        
    * <mark>Function</mark>
        
26. **The process of writing a Python application by first writing tests, and then writing code to ensure that the tests pass is called what?**
    
    * continuous deployment
        
    * Agile development
        
    * continuous integration
        
    * <mark>test-driven development</mark>
        
27. **Which package provides Django's authentication and authorization system?**
    
    * <mark>django.contrib.auth</mark>
        
    * django.apps
        
    * django.core.wsgi
        
    * django.contrib.admin
        
28. **Where does a client specify the data type (like JSON or XML) it would like to receive when asking for data?**
    
    * response headers
        
    * request payload
        
    * <mark>request headers</mark>
        
    * URL path
        
29. **For a given** `<div>` **tag and** `<p>` **tag, which of the following has the correct syntax for an adjacent sibling combinator?**
    
    * div &gt; p
        
    * <mark>div + p</mark>
        
    * div p
        
    * div ~ p
        
30. **What type of algorithm grows depending on the size of the input?**
    
    * exponential time algorithm
        
    * logarithmic time algorithm
        
    * constant time algorithm
        
    * <mark>linear time algorithm</mark>
        

---

![]( align="center")