---
title: "Django Web Framework - Module quiz: Django REST framework"
seoTitle: "Django Web Framework - Module quiz: Django REST framework"
seoDescription: "Django Web Framework - Module quiz: Django REST framework"
datePublished: Mon Nov 11 2024 10:06:09 GMT+0000 (Coordinated Universal Time)
cuid: cm3cuyxly000n08lbc9pz57j8
slug: django-web-framework-module-quiz-django-rest-framework
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731319515949/24ac3a3e-e310-4ad8-9adc-c0e6c76b1ca0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731319551167/c8e1e1bc-3c3e-4132-ad5a-1424f673fda7.png
tags: django-web-framework, django-web-framework-module-quiz-django-rest-framework, module-quiz-django-rest-framework

---

1. **How do you accept a** `GET`**,** `POST` **and** `PUT` **call to a function-based view using an API decorator?**
    
    * An API endpoint cannot accept multiple HTTP methods
        
    * api\_view(\['GET','POST','PUT'\])
        
    * @api\_view('GET','POST','PUT')
        
    * <mark>@api_view(['GET','POST','PUT'])</mark>
        
2. **What are the benefits of using a serializer?** Choose all that apply.
    
    * It can save data to a database
        
    * <mark>It can validate data</mark>
        
    * It helps to authenticate API calls
        
    * It can automatically convert data to JSON or XML
        
    * <mark>It can convert user input and map it to models</mark>
        
    * <mark>It can convert model instances to native Python data types</mark>
        
3. **Which of the following are valid serializer classes in DRF?** Choose all that apply.
    
    * RelationshipSerializer
        
    * <mark>Serializer</mark>
        
    * PrimaryKeySerializer
        
    * <mark>ModelSerializer</mark>
        
    * HyperLinkModelSerializer
        
4. **You can access the data attribute of a serializer class at any time.**
    
    * True
        
    * <mark>False</mark>
        
5. **Which of the following renderers comes with DRF by default?** Choose all that apply.
    
    * XML Renderer
        
    * YAML Renderer
        
    * <mark>JSON Renderer</mark>
        
    * <mark>HTML Rendere</mark>r
        
6. **Which of the following statement is true about DRF?**
    
    * Learning DRF is tough
        
    * DRF is a standalone framework
        
    * <mark>DRF is built for API development</mark>
        
    * DRF doesn’t work with different database engines
        
7. **Which of the following panels are available in the DDT or Django debug toolbar?** Choose all that apply.
    
    * <mark>SQL</mark>
        
    * Throttle
        
    * <mark>Profiling</mark>
        
    * <mark>Headers</mark>
        
    * Network
        
8. **To serialize a queryset that returns more than one item, which of the following arguments is necessary for the serializer class?**
    
    * <mark>many=True</mark>
        
    * multiple\_items=True
        
    * related=True
        
9. **Which of the following statements are true about using renderers?** Choose all that apply.
    
    * <mark>Renderers need an Accept header to work properly</mark>
        
    * You cannot use multiple renderers in a project
        
    * <mark>If no Accept header is present, DRF uses JSON renderer by default.</mark>
        
    * You cannot forcefully use a single renderer
        
    * <mark>Renderers can automatically convert the output</mark>
        
10. **How do you display related model fields as hyperlinks?** Choose all that apply.
    
    * <mark>Using </mark> `HyperlinkedModelSerializer`
        
    * <mark>Using </mark> `HyperlinkedRelatedField`
        
    * A ModelSerializer can do it automatically
        
    * Using `RelationshipSerializer`
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731319507602/6211e4c6-9332-4b25-ae6a-ae471e7efe95.png align="center")