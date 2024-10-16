---
title: "cURL Converter - A tool convert cURL commands to Laravel's HTTP Client"
seoTitle: "cURL Converter - A tool convert cURL commands to Laravel's HTTP Client"
seoDescription: "Last week Shift released the cURL Converter. It allows you to quickly convert curl requests to an Http client request. Now all those example API calls you f"
datePublished: Mon Jan 09 2023 13:22:42 GMT+0000 (Coordinated Universal Time)
cuid: clcou39ca000908l81num31ev
slug: curl-converter-a-tool-convert-curl-commands-to-laravel-s-http-client
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1676044049329/6d165cf7-6f32-48f6-a077-c183e492127c.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1673270542273/b8b3428c-bed0-4995-a74c-bf04b4695a82.jpeg

---

Last week Shift released the *cURL Converter*. It allows you to quickly convert `curl` requests to an `Http` client request. Now all those example API calls you find within documentation can actually be used for your Laravel apps.

For example, take the following `curl` example from [**Fathom**](https://usefathom.com/ref/XVJKMT).

```apache
curl https://api.usefathom.com/v1/account
    -H "Authorization: Bearer API_TOKEN_HERE"
```

Shift's *cURL Converter* outputs its equivalent `Http` request:

```php
Http::withToken('API_TOKEN_HERE')
    ->get('https://api.usefathom.com/v1/account');
```

The underlying code for Shift's cURL Converter is available as [**a package on GitHub**](https://github.com/laravel-shift/curl-converter). This package provides an artisan command which wraps `curl`, allowing you to convert requests to `Http` code from the command line.

For convenience, Shift also has an [**online version of the tool**](https://laravelshift.com/convert-curl-to-http). This allows you to quickly paste and convert `curl` requests. No need to install a Composer package.

If you’re interested in the development of this tool, [**JMac**](https://twitter.com/gonedark) (Jason McCreary), the creator of Shift, [**live streamed**](https://www.youtube.com/watch?v=TpbkhR07W1g&list=PLmwAMIdrAmK5rH3SWvokHV8xI_0mauxDL&index=5) coding it. You may also check out the [**laravel-shift/curl-converter**](https://github.com/laravel-shift/curl-converter) repo to review its code or contribute.

Source:

%[https://laravel-news.com/curl-to-larvel-http-client]