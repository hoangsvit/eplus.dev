---
title: "Laravel Bakery is an on-the-fly GraphQL Schema generator from Eloquent models"
seoTitle: "An on-the-fly GraphQL Schema generator from Eloquent models for Larave"
seoDescription: "An on-the-fly GraphQL Schema generator from Eloquent models for Laravel."
datePublished: Wed Oct 11 2023 04:51:13 GMT+0000 (Coordinated Universal Time)
cuid: clnl9wqe3000909k0gkv45vq1
slug: laravel-bakery-is-an-on-the-fly-graphql-schema-generator-from-eloquent-models
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1696999619835/dc568de0-9318-4920-a174-1e06c22ee3c7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1696999836420/96fabea8-d381-4a78-8b32-d39cce4023c4.png

---

An on-the-fly GraphQL Schema generator from Eloquent models for Laravel.

* [Installation](#heading-installation)
    
* [Quickstart](#heading-quickstart)
    
* [Model schemas](#heading-model-schemas)
    

## Installation

This package requires PHP 7.2 and Laravel 6 or higher. To get started with Bakery, simply run:

```apache
composer require scrnhq/laravel-bakery
```

## Quickstart

After installing Bakery, publish the configuration and asserts using the `bakery:install` Artisan command.

```apache
php artisan bakery:install
```

After running this command, the configuration file should be located at `config/bakery.php`. The default `App\Bakery\User` Bakery model schema refers to the `App\User` model.

You can find your new GraphQL API at `/graphql` and you can navigate to `/graphql/explore` to find GraphiQL, the graphical interactive GraphQL IDE.

```apache
query {
  users {
    items {
      id
    }
  }
}
```

## Model schemas

Model schemas are classes that lets you connect your Eloquent models with the GraphQL API. In there you can define which fields are available, which of them can be mutated and much more.

By default, Bakery model schema's are stored in the `app\Bakery` directory. You can generate a new model schema using the handy `bakery:modelschema` Artisan command.

```apache
php artisan bakery:modelschema Post
```

The `model` property of a model schema defines which Eloquent model it corresponds to.

```apache
/**
 * The model the schema corresponds to.
 *
 * @var string
 */
protected $model = \App\Post::class;
```

### Registering model schemas

> All model schema's in the `app/Bakery` directory will automatically be registered by Bakery. If you choose to store your model schema's differently, you need to define and register your schema manually.

**You are not required to manually define and register a Schema. You can skip this step if you do not wish to manually register a schema.**

In order to make model schemas available within GraphQL, they must be registered in a Schema. First you must create a new `Schema` class. Next, you should set the `schema` item in the `config/bakery.php` file to the newly created Schema.

There are two ways to manually registering model schemas in Bakery. You can use the `modelsIn` method in the schema to load all models schemas in a given directory, or you can manually return an array of models schemas.

```apache
namespace App\Support;

use Bakery\Support\Schema as BaseSchema;

class Schema extends BaseSchema
{
    /*
     * Get the models for the schema.
     *
     * @return array
     */
    public function models()
    {
        return $this->modelsIn(app_path('Bakery'));
        
        // Or, manually.
        return [
            App\Bakery\User::class,
            App\Bakery\Post::class,
        ];
    }
}
```

Now that you have created and registered your model schemas with Bakery, you can browse to `/graphql/explore` and query your models in the interactive playground GraphQL.

```apache
query {
  posts {
    items {
      id
    }
  }
}
```

If everything is set up properly you will get a collection of posts in your database. You can also use GraphQL to retrieve a single post.

```apache
query {
  posts(id: "1") {
    id
  }
}
```

Just like Laravel, Bakery follows naming conventions. It uses Laravel's pluralization library to transform your model into queries so you can fetch an individual Post with `post` and a collection of Posts with `posts`.

### Fields

Now, each Bakery model schema contains a `fields` that return an array of fields, which extend the `\Bakery\Fields\Field` class. To add a field to model schema, simply add it to `fields` method, where the key of the item must match the name of the model `attribute`.

```apache
use Bakery\Field;

/**
 * Get the fields for the schema.
 *
 * @return array
 */
public function fields(): array
{
    return [
        'title' => Field::string(),
    ];
}
```

Now you can query the title of the posts in GraphQL.

```apache
query {
  post(id: "1") {
    id
    title
  }
}
```

#### Field Types

Bakery has the following fields available:

* [Boolean](#heading-boolean)
    
* [Float](#heading-float)
    
* [ID](#heading-id)
    
* [Int](#heading-int)
    
* [String](#heading-string)
    

##### Boolean

```apache
Field::boolean()
```

##### Float

```apache
Field::float()
```

##### ID

```apache
Field::ID()
```

##### Int

```apache
Field::int()
```

##### String

```apache
Field::string()
```

### Relations

In addition to the fields described above, Bakery supports Eloquent relationships, too. To add a relationship to the model schema, simply add it to the `relations` method, where the key of the item must match the relation name. Let's say a `User` model `hasMany` `Post` models. Then you would define your Bakery model schema's like so:

`app\Bakery\User.php`

```apache
use Bakery\Field;
use App\Bakery\Post;

/**
 * Get the fields for the schema.
 *
 * @return array
 */
public function relations()
{
    return [
        'posts' => Field::collection(Post::class),
    ];
}
```

The inverse of the previous relation is that a `Post` model `belongsTo` a `User` model. The Bakery model schema would be defined like so:

`app\Bakery\Post.php`

```apache
use Bakery\Field;
use App\Bakery\User;

/**
 * Get the fields for the schema.
 *
 * @return array
 */
public function relations()
{
    return [
        'user' => Field::model(User::class),
    ];
}
```

This way you can get all posts related to a user within a single GraphQL query.

```apache
query {
  user(id: "1") {
    id
    posts {
      id
    }
  }
}
```

### Mutations

Another key feature of GraphQL that Bakery fully supports are mutations. Bakery automatically creates the `create`, `update`, and `delete` mutations for each registered model. Bakery also seamlessly uses Laravel's policies to authorize the actions of your users.

> Having policies for your models is required for Bakery mutations to work. See [https://laravel.com/docs/5.7/authorization](https://laravel.com/docs/5.7/authorization) for more information.

For example, with the model schemas mentioned above, you could create a `Post` with a simple GraphQL mutation.

```apache
mutation {
  createPost(input: {
    title: "Hello world!"
  }) {
    id
  }
}
```