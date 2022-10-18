# Complete Explanation With Example On Laravel Middleware

In this tutorial, we will learn Laravel middleware. We will learn with custom middleware and also Laravel predefined middleware. Middleware is a very important part of every framework not only Laravel. But what is middleware and how this middleware works in every framework like Laravel?

## What is middleware in Laravel?

Middleware provides an easy mechanism to inspect and filter HTTP requests before getting the required information from the request. There are lots of predefined middleware in Laravel. All the middleware in Laravel is registered in the `app\Http\Kernel.php` file. If you visit this path, you will see the following file is already registered.

```php
<?PHP
/* App\Http\Kernel.php */

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     * These middleware are run during every request to your application.
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class,
        \Fruitcake\Cors\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'prevent-back-history' => \App\Http\Middleware\PreventBackHistory::class,
        'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
        'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
        'role_or_permission' => \Spatie\Permission\Middlewares\RoleOrPermissionMiddleware::class,
    ];
}
``` 

Look at that Kernel.php class, there are three middleware arrays like `$middleware`, `$middlewareGroups` and `$routeMiddleware`. 

  - `$middleware`: These middleware are run during every request to your application. Actually global middleware.
  - `$middlewareGroups`: The application's route middleware groups.
  - `$routeMiddleware`: This middleware may be assigned to groups or used individually. We can use it for specific routes only.

## Why do we use middleware?

Take an example, If the user is not logged in, the middleware will redirect the user to your application's login screen. and, if the user is logged in, then the middleware will allow the request to proceed further into the application. How we can implement that? Check out your `$routeMiddleware` group, there is an auth middleware. We can use it to fulfill this requirement.

```php
<?php
/* App\Http\Kernel.php */
protected $routeMiddleware = [
  'auth' => \App\Http\Middleware\Authenticate::class,
];
``` 
Now if we use this auth middleware in our route like:

```php
/* routes/web.php */
Route::get('/profile', function () {
    //
})->middleware('auth');
``` 

Now only a logged-in user can visit this `/profile` URI. For this type of situation, we need a middleware and we can solve this situation using middleware. 

## Creating Custom Middleware in Laravel

To create a new middleware, there is an artisan command for creating custom middleware using the `make:middleware` Artisan command: 

```
php artisan make:middleware EnsureTokenIsValid
```

If you run this command will place a new `EnsureTokenIsValid` class within your `app/Http/Middleware` directory. 

```php
<?php
/* app/Http/Middleware/EnsureTokenIsValid.php */
 
namespace App\Http\Middleware;
 
use Closure;
 
class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
``` 

Now make it useable in our application. Let's update it like below:


```php
<?php
 /* app/Http/Middleware/EnsureTokenIsValid.php */

namespace App\Http\Middleware;
 
use Closure;
 
class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->input('token') !== 'my-secret-token') {
            return redirect('home');
        }
 
        return $next($request);
    }
}
``` 

Now we can use this middleware in our application to filter user requests like:

```php
<?php
/* routes/web.php */

use App\Http\Middleware\EnsureTokenIsValid;
 
Route::get('/profile', function () {
    //
})->middleware(EnsureTokenIsValid::class);
``` 

Now you can visit this `/profile` URL only if you can provide a matching token, otherwise, you can not visit this page.

## Registering Middleware

If we would like to assign middleware to specific routes, we should first assign the middleware inside `$routeMiddleware` arrays with the key name like:

```php
<?php
/* App\Http\Kernel.php */

protected $routeMiddleware = [
    'check-token' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
];
``` 

Now we can handle the previous route with middleware in the following way:

```php
<?php
/* routes/web.php */

use App\Http\Middleware\EnsureTokenIsValid;
 
Route::get('/profile', function () {
    //
})->middleware('check-token');
``` 

## Assign Multiple Middleware to Route

We can assign multiple middlewares to route also. If we want to assign multiple middlewares to the route by passing an array of middleware names to the `middleware` method:

```php
/* routes/web.php */

Route::get('/profile', function () {
    //
})->middleware(['auth', 'check-token']);
``` 

## Excluding Middleware From Route

When we assign middleware to a group of routes, we may also need to prevent the middleware from being applied to an individual route within the group. We may accomplish this using the `withoutMiddleware` method:

```
<?php
/* routes/web.php */

use App\Http\Middleware\EnsureTokenIsValid;
 
Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('/', function () {
        //
    });
 
    Route::get('/profile', function () {
        //
    })->withoutMiddleware([EnsureTokenIsValid::class]);
});

//or
 
Route::middleware(['check-token'])->group(function () {
    Route::get('/', function () {
        //
    });
 
    Route::get('/profile', function () {
        //
    })->withoutMiddleware(['check-token']);
});
``` 

We can also exclude a given set of middleware from an entire `group` of route definitions:

```php
<?php
/* routes/web.php */

use App\Http\Middleware\EnsureTokenIsValid;
 
Route::withoutMiddleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('/profile', function () {
        //
    });
});
``` 

## Middleware Parameters

We can pass parameters in Laravel middleware also. The Laravel middleware can also receive additional parameters. Additional middleware parameters can be passed to the middleware after the $next argument like:

```php
<?php
 * app\Http\Middleware\EnsureUserHasRole.php */
namespace App\Http\Middleware;
 
use Closure;
 
class EnsureUserHasRole
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // Redirect...
        }
 
        return $next($request);
    }
 
}
``` 

Middleware parameters must be specified when defining the route by separating the middleware name and parameters with a : and if Multiple then parameters should be delimited by commas:

```php
/* routes/web.php */

Route::put('/post/{id}', function ($id) {
    //
})->middleware('role:editor');
``` 

If you want to learn more about Laravel middleware and how middleware works, then you can enroll in this course to enlarge your knowledge about middleware:

## Terminable Middleware in Laravel

Suppose, we need to do something when the HTTP response has been sent to the browser. In this case, we can use terminable middleware. To do so, we have to add `terminate` method on your middleware like:

```php
<?php
 /* app\Http\Middleware\TerminatingMiddleware.php */
namespace Illuminate\Session\Middleware;
 
use Closure;
 
class TerminatingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
 
    /**
     * Handle tasks after the response has been sent to the browser.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     * @return void
     */
    public function terminate($request, $response)
    {
        // Handle tasks after the response has been sent to the browser.
    }
}
``` 

Look at the `terminate` method, It receives both the request and the response. Once we have defined a terminable middleware, we should add it to the list of routes or global middleware in the `app/Http/Kernel.php` file.

Source: [laravelia](https://www.laravelia.com/post/complete-explanation-with-example-on-laravel-middleware)