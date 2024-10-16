---
title: "Laravel Security Middleware"
seoTitle: "Laravel Security Middleware"
seoDescription: "Middleware isn't something new. We have been using it in our applications for quite a while now for various usages, from Authentication to Authorization"
datePublished: Wed May 17 2023 15:52:57 GMT+0000 (Coordinated Universal Time)
cuid: clhrvtiev000009le0k590kq0
slug: laravel-security-middleware
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1684338551764/6d8dcecf-e94a-450c-8a48-d919c23773da.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1684338750733/de84b229-ec66-4f39-8bff-4c470e16548e.png

---

Middleware isn't something new. We have been using it in our applications for quite a while now for various usages, from Authentication, to Authorization and beyond.

In this tutorial, I will walk through how you can leverage the power of middleware in your Laravel application to help increase the security of your applications. You can add countless headers to your application, which do different things. Let's dive into a few different security headers to see what they do - and what I like to do in my applications.

The first thing we want to do when thinking about security in our Laravel application is think about the headers we do not want to expose. Typically your application will reveal the following headers by default:  
`X-Powered-By` - this will display the tech stack your application is powered by.  
`server`/`Server` - this will reveal the server technology running your application. For example, `apache` or `nginx` etc.

The first thing we want to do here is to remove these headers.

I work for a company called [**Treblle**](https://www.treblle.com/), which is like Google Analytics for your API. We are releasing a [**new API Security check**](https://www.treblle.com/features/api-security) soon, and I have [**open-sourced the middleware**](https://github.com/Treblle/security-headers) we use to hide specific headers. It looks like the following:

```php
final class RemoveHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);
 
        /**
         * @var string $header
         */
        foreach ((array) config('headers.remove') as $header) {
            $response->headers->remove(
                key: $header,
            );
        }
 
        return $response;
    }
}
```

This middleware goes through the configured headers in my config file and ensures they are removed from the response before returning it to the user.

The next thing I typically do here is set the `Referrer-Policy` header to `no-referrer-when-downgrade` when the request returns to the same origin - but not for any cross-origin requests. I do this using another piece of middleware:

```php
final class SetReferrerPolicy
{
    public function handle(Request $request, Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);
 
        $response->headers->set(
            key: 'Referrer-Policy',
            values: config('headers.referrer-policy),
        );
 
        return $response;
    }
}
```

I split these actions into separate middleware classes so that I can be specific about the level that is important to me regarding security in each route. I want to be more open for some routes, while I want them to be slightly less open for others.

Let's talk about the `Strict-Transport-Security` header for a moment. This will tell the client/browser to connect to our application using HTTPS and how long this rule should be in place. This header helps to protect your application users from man-in-the-middle attacks. You can also add the `includeSubdomains` to this header, telling the browser to apply this policy to all website subdomains.

```php
final class StrictTransportSecurity
{
    public function handle(Request $request, \Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);
 
        $response->headers->set(
            key: 'Strict-Transport-Security',
            values: config('headers.strict-transport-security'),
        );
 
        return $response;
    }
}
```

The following header I like to look at is the `Content-Security-Policy` header, one of the more commonly used ones. I did not create custom middleware for this one, as [**Spatie**](https://spatie.be/) has a [**fantastic package**](https://laravel-news.com/laravel-content-security-policies) you can use. The Laravel News article linked has excellent instructions on how to set this up, so I will not go through the specifics for this one. So let's move on.

Your SSL certificate can have different transparency levels for your users. This public logging mechanism will allow anyone to monitor certificate issuance. This will help detect and prevent things such as fake certificates. It also has various configuration options:  
`max-age` will specify the maximum time (in seconds) for which the browser should remember the policy.  
`enforce` will specify if you want the browser to enforce the policy. If we set this to true, the browser will not allow no-SSL connections to your application.  
`report-uri` will specify the URL where the browser should send any reports about violations of your application's CT policy.  
Let's look at the middleware for this and see what we want to do:

```php
final class CertificateTransparencyPolicy
{
    public function handle(Request $request, \Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);
 
        $response->headers->set(
            key: 'Expect-CT',
            values: config('headers.certificate-transparency'),
        );
 
        return $response;
    }
}
```

As you can see, some of these middleware classes are simple. The combination of them will give you the best protection against potential attacks.

The last middleware we want to look at is the `Permissions-Policy` header. We can use this header to tell the browser what features and APIs the browser is allowed to use. This will help protect you against things such as XSS attacks and click-jacking.

```php
final class PermissionsPolicy
{
    public function handle(Request $request, \Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);
 
        $response->headers->set(
            key: 'Permissions-Policy',
            values: config('headers.permissions-policy'),
        );
 
        return $response;
    }
}
```

Using this middleware, I can be particular about the features I want to enable, meaning that I can ensure more safety for my end user and myself.

Another great package you can check out is [**Laravel Security Headers**](https://github.com/therobfonz/laravel-security-headers) by [**Rob Fonseca**](https://twitter.com/therobfonz).

Do you have any additional middleware that you use? Or maybe a specific setting for one of the ones listed? Let us know on Twitter!

Source:

%[https://laravel-news.com/laravel-security-middleware]