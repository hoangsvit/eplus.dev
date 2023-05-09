---
title: "PostgreSQL Full Text Search for Laravel Scout"
seoTitle: "PostgreSQL Full Text Search for Laravel Scout"
seoDescription: "This package makes it easy to use native PostgreSQL Full Text Search capabilities with Laravel Scout:"
datePublished: Tue May 09 2023 06:57:32 GMT+0000 (Coordinated Universal Time)
cuid: clhfx652w001v0akz52be9t92
slug: postgresql-full-text-search-for-laravel-scout
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1683615377223/411d4569-13f7-458b-bd8e-4975d555bd8a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1683615439713/e8e28377-f44a-47f1-b5b4-ebd8531e0efb.png
tags: laravel, laravel-scout

---

This [**package**](https://github.com/devNoiseConsulting/laravel-scout-postgres-tsvector) makes it easy to use native PostgreSQL Full Text Search capabilities with Laravel Scout:

```php
// plainto_tsquery()
$posts = App\Post::search('cat rat')
    ->usingPlainQuery()->get()
 
// phraseto_tsquery()
$posts = App\Post::search('cat rat')
    ->usingPhraseQuery()->get()
 
// to_tsquery()
$posts = App\Post::search('fat & (cat | rat)')
    ->usingTsQuery()->get()
 
// websearch_to_tsquery()
// uses web search syntax
$posts = App\Post::search('"sad cat" or "fat rat" -mouse')
    ->usingWebSearchQuery()->get()
 
// DIY using a callback
use ScoutEngines\Postgres\TsQuery\ToTsQuery;
 
$results = App\Post::search('fat & (cat | rat)', function ($builder, $config) {
    return new ToTsQuery($builder->query, $config);
})->get();
```

And here's an example model:

```php
class Post extends Model
{
    use Searchable;
 
    // Configurable search data...
    // Bring other data (i.e., tags) to the index document
    public function toSearchableArray()
    {
        return [
            'title' => $this->title,
            'content' => $this->content,
            'author' => $this->user->name,
            'tags' => $this->tags->pluck('tag')->implode(' '),
        ];
    }
 
    public function searchableOptions()
    {
         return [
            // Model search config for index settings, rank, etc.
         ];
    }
}
```

The way this integration works is that the parsed document model data is stored in the same table in the `searchable` column with the [**tsvector type**](https://www.postgresql.org/docs/current/datatype-textsearch.html#DATATYPE-TSVECTOR). You can fine-tune how each model works by integrating a `searchableOptions()` method, which allows you to:

* Configurable column name (default is `searchable`)
    
* Rank groups can be assigned to fields in the table
    
* Rank weights are configurable for each rank group
    
* Configurable ranking function to use (`ts_rank` or `ts_rank_cd`)
    
* Rank normalization
    
* And more...
    

You can learn more about this package, get full installation instructions, and view the [**source code**](https://github.com/devNoiseConsulting/laravel-scout-postgres-tsvector) on GitHub.

Source:

%[https://laravel-news.com/postgresql-full-text-search-for-laravel-scout]