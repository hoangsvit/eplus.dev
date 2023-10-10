---
title: "Improve Debugging Output With Laravel Dumper"
seoTitle: "Improve Debugging Output With Laravel Dumper"
seoDescription: "The Laravel dumper package improves on the default dumper with useful Laravel-specific enhancements."
datePublished: Tue Oct 10 2023 07:31:00 GMT+0000 (Coordinated Universal Time)
cuid: clnk06d4i000j09l4due3cig7
slug: improve-debugging-output-with-laravel-dumper
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1696922487382/38126a53-7d64-44a3-a552-e6a5852518bc.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1696923033960/69032e87-1841-41df-b779-f15d40167281.webp
tags: laravel, debugging

---

The Laravel [**dumper**](https://github.com/glhd/laravel-dumper) package improves on the default dumper with useful Laravel-specific enhancements.

You’ll get helpful information for various core Laravel objects, such as:

* Models
    
* Query Builders
    
* Service Container
    
* Database Connections
    
* Carbon Instances
    
* Requests and Responses
    

Take this simple `Post` model query, for example, which conveniently outputs the query builder SQL query at the top:

```apache
Illuminate\Database\Eloquent\Builder {#332
  sql: "select `title` from `posts` where `id` = '1'"
  #connection: Illuminate\Database\MySqlConnection {#334 ▶}
  #model: App\Models\Post {#320 …}
  #eagerLoad: []
   …5
}
```

You can expect enhanced output automatically wherever you typically use `dd()` and even get the experience with chaining `dd()` calls onto the query builder. For example:

```apache
Post::query()->select('title')->where('id', 1)->dd();
```

Would output something like the following:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1696922927166/dc37a5db-7f94-4e34-943f-c29c6e0dc894.webp align="center")

If you still want to access the original default dump/dd behavior, you can use the following helper functions:

```apache
// f = full
ddf();
dumpf();
```

## [Custom Casters](https://github.com/glhd/laravel-dumper#custom-casters)

If there are objects in your project that you would like to customize the `dd()` behavior for, you can register custom casters using the `CustomCaster` class:

```apache
use Glhd\LaravelDumper\Casters\CustomCaster;

CustomCaster::for(User::class)
    ->only(['attributes', 'exists', 'wasRecentlyCreated']) // Props to keep (or use `except` to exclude)
    ->virtual('admin', fn(User $user) => $user->isAdmin()) // Add virtual props
    ->filter() // Filter out empty/null props (accepts callback)
    ->reorder(['attributes', 'admin', '*']); // Adjust the order of props
```

The `reorder` method accepts an array of patterns. For example, the default `Model` caster uses the following ordering rules:

```apache
$order = [
  'id',
  '*_id',
  '*',
  '*_at',
  'created_at',
  'updated_at',
  'deleted_at',
];
```

This ensures that `id` is always first, followed by all foreign keys, followed by all other attributes, and then finally followed by timestamp attributes (with `deleted_at` last). By applying bespoke ordering rules, you can make sure that the properties you usually need to debug are at the top of the `dd()` output.

### Advanced Custom Casters

It's also possible to register your own casters for any class by publishing the `laravel-dumper` config file and registering your custom classes in the `'casters'` section of the config. This gives you the same level of control over the `dd()` output as the core Symfony VarDumper package, but is more complex to implement.

Your custom casters should extend `Glhd\LaravelDumper\Casters\Caster` and implement the `cast` method. See any of our [built-in casters](https://github.com/glhd/laravel-dumper/blob/main/src/Casters) for more details.

If you’d like to learn more about the difference between the default experience and the enhancements made by the dumper package, check out the [**Laravel Dumper diffs**](https://github.com/glhd/laravel-dumper/tree/main/diffs) on GitHub.