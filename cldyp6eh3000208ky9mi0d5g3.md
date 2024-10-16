---
title: "Learn how to impersonate users in your Laravel app"
seoTitle: "Learn how to impersonate users in your Laravel app"
seoDescription: "One of the neat features of Laravel Nova is the ability to impersonate users right from the control panel. This is handy for many reasons, but for me, when"
datePublished: Fri Feb 10 2023 15:42:35 GMT+0000 (Coordinated Universal Time)
cuid: cldyp6eh3000208ky9mi0d5g3
slug: learn-how-to-impersonate-users-in-your-laravel-app
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1676043567484/b4bcbf7e-ce64-4d71-8d9b-2d1603f76ee2.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1676043744144/3b6d9c9d-eb96-4357-9c53-bde1516af851.jpeg

---

One of the neat features of Laravel Nova is the ability to impersonate users right from the control panel. This is handy for many reasons, but for me, when you get a bug report or an issue and want to see exactly what the user sees, impersonating them saves lots of time because you can see exactly what they see.

If you'd like to set this up in your Laravel app, the Laravel Impersonate [**package**](https://github.com/404labfr/laravel-impersonate) makes this simple. Here is how to get started.

## **Step 1. Require and set up the package**

Just like all packages, require it with composer:

```php
composer require lab404/laravel-impersonate
```

Next, open `config/app.php` and add it to the providers array:

```php
'providers' => [
    // ...
    Lab404\Impersonate\ImpersonateServiceProvider::class,
],
```

After that, open your `Models/User` and add the trait:

```php
use Lab404\Impersonate\Models\Impersonate;
 
class User extends Authenticatable
{
    use Impersonate;
```

## **Step 2. Impersonate Routes**

The Laravel Impersonate package includes a few ways to impersonate a user, but I found it easiest to use their routes macro by adding it to your `routes/web.php` file

```apache
Route::impersonate();
```

This gives you a few named routes:

```php
// Where $id is the ID of the user you want to impersonate
route('impersonate', $id)
 
// Or in case of multi guards, you should also add `guardName` (defaults to `web`)
route('impersonate', ['id' => $id, 'guardName' => 'admin'])
 
// Generate an URL to leave the current impersonation
route('impersonate.leave')
```

## **Step 3. Laravel Blade impersonation usage**

With Laravel Impersonate all set up now, you can use a few Blade helpers:

```php-template
@canImpersonate($guard = null)
    <a href="{{ route('impersonate', $user->id) }}">Impersonate this user</a>
@endCanImpersonate
```

Then the reverse:

```php-template
@impersonating($guard = null)
    <a href="{{ route('impersonate.leave') }}">Leave impersonation</a>
@endImpersonating
```

## **Step 4. Advanced set up**

One more thing you might want to consider setting up is options to limit who can impersonate other users, and which users can be impersonated. On your `Models/User`, you can add the following methods:

```php
/**
 * By default, all users can impersonate anyone
 * this example limits it so only admins can
 * impersonate other users
 */
public function canImpersonate(): bool
{
    return $this->is_admin();
}
 
/**
 * By default, all users can be impersonated,
 * this limits it to only certain users.
 */
public function canBeImpersonated(): bool
{
    return ! $this->is_admin();
}
```

## **Closing**

Overall the Laravel Impersonate package includes everything you need to log in as others users easily and is a simple way of adding this to your app. If you'd like to find out more about the package and the more advanced features, check out the [**package**](https://github.com/404labfr/laravel-impersonate) and the read me includes more details.

Source:

%[https://laravel-news.com/laravel-impersonate]