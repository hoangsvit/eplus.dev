---
title: "Laravel Comments Package - Spatie"
seoTitle: "Laravel Comments Package - Spatie"
seoDescription: "Laravel Comments is a premium comments package for applications using PHP 8.1+ and Laravel 9+ by Spatie. Using this package, you can create and associate co"
datePublished: Wed Oct 19 2022 02:09:06 GMT+0000 (Coordinated Universal Time)
cuid: cl9ezx4ya000c09muh4shhfv6
slug: laravel-comments-package-spatie
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1666144869270/p9S2iBrcp.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1666145326007/lKr0jiz-1.png

---

[Laravel Comments](https://laravel-comments.com/) is a premium comments package for applications using PHP 8.1+ and Laravel 9+ by Spatie. Using this package, you can create and associate comments with Eloquent models.

%[https://twitter.com/freekmurze/status/1529474930617765888]

At the time of launch, Laravel Comments' main features include:

A beautiful Livewire component to display comments
- markdown submission is supported, we'll render it as html
- code snippets that appear in comments will automatically be highlighted
- users can react to comments (👍, ❤️, or any emoji you want)
- optionally, you enable a comment approval flow
- sane API for creating your own commenting UI
- Livewire components out of the box
At the core of this package is the HasComments trait you'll add to models:

```php
use Illuminate\Database\Eloquent\Model;
use Spatie\Comments\Models\Concerns\HasComments;
 
class Post extends Model
{
    use HasComments;
}
``` 

Which then enables you to manage comments and reactions on a model:

```php
$post->comment("I've got a feeling");
 
$comment->react('😍');
``` 

While the above is a barebones example, the package also comes with a fully baked Laravel Livewire component, which also supports one level of nested comments:


![laravel-comments-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1666145220285/xOilfcQwO.png align="left")

Note that you must pay for a premium license to use this package. To get started, check out the [Laravel Comments documentation](https://spatie.be/docs/laravel-comments/v1/introduction).

Source:

%[https://laravel-news.com/laravel-comments]



