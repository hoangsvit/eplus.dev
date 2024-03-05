---
title: "Laravel 11 is set to be released in Q1 of 2024"
seoTitle: "Laravel 11 is set to be released in Q1 of 2024"
seoDescription: "Laravel 11 is set to be released in Q1 of 2024 and will include several new features and changes. The directory structure has been streamlined, with a reduc"
datePublished: Tue Mar 05 2024 02:03:49 GMT+0000 (Coordinated Universal Time)
cuid: cltdq7tzj000009js5yooa99e
slug: laravel-11-is-set-to-be-released-in-q1-of-2024
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1709604119936/930a9a83-ea4b-4ae1-9ecb-036e8ca38d1d.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1709604202475/f11c853e-55f8-46d8-9ae0-023590ef1783.webp
tags: websockets, laravel-11, laravel-websocket, laravel-support-policy

---

Laravel 11 is set to be released in Q1 of 2024 and will include several new features and changes. The directory structure has been streamlined, with a reduction in the number of files on a fresh install. Controllers no longer extend anything by default, and the middleware directory has been removed, with customization options moved to the `App/ServiceProvider`.

Model casts are now defined as methods instead of properties, allowing for more flexibility in defining casts. A new `Dumpable` trait has been introduced to streamline the framework's core by consolidating "dd" or "dump" methods.

Laravel 11 will also see changes to config files, with all config options cascading down and the `.env` file expanded to include all the options you'd want to set. A new `config:publish` command is included to bring back any config you might want.

The `once` helper method has been added to ensure the same value is returned no matter how many times you call an object method. Default migrations have been slimmed down, and there will be only two route files by default, with API routes and websocket broadcasting becoming opt-in\[1\].

Laravel 11 will include a new `/up` health route that fires a `DiagnosingHealthEvent`, allowing for better integration with up-time monitoring. The `APP_KEY` rotation has been improved to prevent broken data in the database, and the console kernel is being removed, with console commands defined in `routes/console.php`\[1\].

Named arguments are not covered by Laravel's backward compatibility guidelines, and the framework may rename function arguments when necessary. Eager load limit has been integrated into Laravel 11, and the minimum PHP version required is 8.2, with SQLite 3.35.0+ also required\[1\].

Laravel 11 will no longer depend on the Doctrine DBAL, and registering custom Doctrine types is no longer necessary for the proper creation and alteration of various column types\[1\].

The official release date for Laravel 11 is not set, but it is expected to be released in the first or second week of March 2024.

---

## [**#**](https://laravel-news.com/laravel-11#content-streamlined-directory-structure)**Streamlined Directory Structure**

<iframe width="560" height="315" src="https://www.youtube.com/embed/lQSEBvxuXiU?si=5wL1B2ntkPoTaEeF" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

On a fresh install, the file count has dropped by ~ 69 files. Nice.

Check out our post on this complete new [**Laravel 11 Directory Structure**](https://laravel-news.com/laravel-11-directory-structure)

So far, these are just a beta preview. They might change, but as of now, here is what to expect...

* Controllers no longer extend anything by default.
    
* The config files are gone.
    
* No more middleware directory.
    

Currently, Laravel includes nine middleware and many you would never customize. However, if you do want to customize them, that is moved to the App/ServiceProvider. For example:

```php
public function boot(): void
{
    EncryptCookies::except(['some_cookie']);
}
```

## [**#**](https://laravel-news.com/laravel-11#content-no-more-httpkernel)**No more Http/Kernel**

Most of the things you used to could do in the Kernel you can now do in the Bootstrap/App.

```php
return Application::configure()
    ->withProviders ()
    -›withRouting(
        web: __DIR__.'/../routes/web.php'
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function(Middleware Smiddleware) {
        $middleware->web(append: LaraconMiddleware::class):
    })
```

## [**#**](https://laravel-news.com/laravel-11#content-model-casts-changes)**Model casts changes**

<iframe width="918" height="516" src="https://www.youtube.com/embed/2WDtpAHRCMA" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

Model casts are now defined as a method instead of a property. When defined as a method we can do other things, like call other methods directly from the casts. Here is an example using a new Laravel 11 `AsEnumCollection`:

```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'options'=› AsEnumCollection::of(UserOption::class),
    ];
}
```

## [**#**](https://laravel-news.com/laravel-11#content-new-dumpable-trait)**New Dumpable Trait**

This aims to streamline the core of the framework since multiple classes currently have "dd" or "dump" methods. Plus you can use this `Dumpable` trait in your own classes:

```php
class Stringable implements JsonSerializable, ArrayAccess
{
    use Conditionable, Dumpable, Macroable, Tappable;
 
    str('foo')->dd();
    str('foo')->dump();
```

Read more about the new [**Dumpable Trait**](https://laravel-news.com/laravel-11-dumpable-trait).

## [**#**](https://laravel-news.com/laravel-11#content-config-changes)**Config Changes**

<iframe width="400" height="711" src="https://www.youtube.com/embed/L_N2_m-wXQ4" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

Laravel has a lot of config files, and Laravel 11 removes these, and all config options cascade down. The `.env` has been expanded to include all the options you'd want to set.

To pair with this is a new `config:publish` command so you can bring back any config you might want. Even with bringing them back, the new cascade feature allows you to remove every option you don't want to customize.

Read more about the [**config changes**](https://laravel-news.com/laravel-11-directory-structure) or watch our [**reel**](https://www.instagram.com/reel/C2uWVYwCqm_/)

## [**#**](https://laravel-news.com/laravel-11#content-new-once-method)**New Once method**

<iframe width="918" height="516" src="https://www.youtube.com/embed/cZEK0O3CGto" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

Laravel 11 includes a new [**once helper method**](https://laravel-news.com/once-helper) that ensures you'll always get the same value no matter how many times you call an object method. The once function is helpful when you have some code that you want to ensure only ever runs one time.

## [**#**](https://laravel-news.com/laravel-11#content-slimmed-default-migrations)**Slimmed default Migrations**

When you start a new Laravel app, it comes with some default migrations from 2014 and 2019. These now will come with the dates removed and moved into just two files.

Watch our [**Instagram Reel**](https://www.instagram.com/reel/C2w58cPA2eI/)

## [**#**](https://laravel-news.com/laravel-11#content-routes-changes)**Routes changes**

By default, there will be only two route files, console.php and web.php. API routes will now become opt-in via `php artisan install:api`, giving you the API routes file and Laravel Sanctum.

The same with websocket broadcasting, `php artisan install:broadcasting`.

## [**#**](https://laravel-news.com/laravel-11#content-new-up-health-route)**New up Health Route**

<iframe width="568" height="1010" src="https://www.youtube.com/embed/EmvHPg8JpB4" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

Laravel 11 will include a new `/up` [**health route**](https://laravel-news.com/laravel-11-health-endpoint) that fires a `DiagnosingHealthEvent` so you can better integrate with up-time monitoring.

## [**#**](https://laravel-news.com/laravel-11#content-appkey-rotation)**APP\_KEY Rotation**

In older versions of Laravel, if you change your `APP_KEY` it could lead to broken data in the database. Laravel 11 has a new graceful rotation that will NOT break old encrypted data, using an `APP_PREVIOUS_KEYS` .env variable. It will auto-re-encrypt the data using a new key.

## [**#**](https://laravel-news.com/laravel-11#content-console-kernel-removed)**Console Kernel Removed**

The Console Kernel is being removed, and you'll be able to instead define your console commands right in `routes/console.php`.

## [**#**](https://laravel-news.com/laravel-11#content-named-arguments)**Named Arguments**

[**Named arguments**](https://www.php.net/manual/en/functions.arguments.php#functions.named-arguments) are not covered by Laravel's backwards compatibility guidelines. They may choose to rename function arguments when necessary in order to improve the Laravel codebase. When calling Laravel methods using named arguments should be done cautiously and with the understanding that the parameter names may change in the future.

## [**#**](https://laravel-news.com/laravel-11#content-eager-load-limit)**Eager Load Limit**

<iframe width="918" height="516" src="https://www.youtube.com/embed/n4oiIa6BDqE" style="box-sizing:border-box;border-width:0px;border-style:solid;border-color:rgb(211, 214, 223);--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;display:block;vertical-align:middle;margin:3rem auto;overflow:hidden;box-shadow:rgba(0, 0, 0, 0.08) 0px 14px 34px;width:848px;height:auto;aspect-ratio:16 / 9;border-radius:0.5rem;color:rgb(55, 65, 81);font-family:scandia-web, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;white-space:normal;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial"></iframe>

Laravel 11 integrates the code behind the "eager load limit" package:

```php
User::select('id', 'name')->with([
    'articles' => fn($query) => $query->limit(5)
])->get();
```

Read more about [**Eager Load Limit**](https://laravel-news.com/eager-load-limit) here.

## [**#**](https://laravel-news.com/laravel-11#content-when-will-laravel-11-be-released)**When will Laravel 11 be released?**

No official date is set other than Q1 2024. At Laracon EU it was hinted that it'll be the first or second week of March 2024.

## [**#**](https://laravel-news.com/laravel-11#content-php-82-minimum-support)**PHP 8.2 minimum support**

This was an early decision, but Laravel 11 apps require a minimum of PHP 8.2. If you are running an older version of PHP, now is a good time to get that upgraded.

## [**#**](https://laravel-news.com/laravel-11#content-sqlite-3350-required)**SQLite 3.35.0+ required**

If you use a SQLite database, then Laravel 11 will require SQLite 3.35.0 or greater.

## [**#**](https://laravel-news.com/laravel-11#content-doctrine-dbal-removal)**Doctrine DBAL Removal**

Laravel is no longer dependent on the Doctrine DBAL and registering custom Doctrines types is no longer necessary for the proper creation and alteration of various column types that previously required custom types.

## [**#**](https://laravel-news.com/laravel-11#content-install-laravel-11)**Install Laravel 11**

Laravel 11 hasn't been released yet, but you can start using it and testing it by running Laravel New with the `--dev` flag:

```plaintext
laravel new projectname --dev
```

Keep in mind things will change from now until the official Laravel 11 release.

## [**#**](https://laravel-news.com/laravel-11#content-upgrade-to-laravel-11)**Upgrade to Laravel 11**

[**Laravel Shift**](https://laravelshift.com/) is the easiest way to upgrade but you can also follow the upgrade guide in the Laravel [**docs**](https://laravel.com/docs/master/upgrade#upgrade-11.0)

## [**#**](https://laravel-news.com/laravel-11#content-laravel-support-policy)**Laravel Support Policy**

For all Laravel releases, bug fixes are provided for 18 months, and security fixes are provided for 2 years. For all additional libraries, including Lumen, only the latest major release receives bug fixes.

| **Version** | **PHP (\*)** | **Release** | **Bug Fixes Until** | **Security Fixes Until** |
| --- | --- | --- | --- | --- |
| [**Laravel 9**](https://laravel-news.com/laravel-9) | 8.0 - 8.2 | February 8th, 2022 | August 8th, 2023 | February 6th, 2024 |
| [**Laravel 10**](https://laravel-news.com/laravel-10) | 8.1 - 8.2 | Q1 2023 | August 6th, 2024 | February 4th, 2025 |
| [**Laravel 11**](https://laravel-news.com/laravel-11) | 8.2 | Q1 2024 | August 5th, 2025 | February 3rd, 2026 |

## [**#**](https://laravel-news.com/laravel-11#content-wrapup)**Wrapup**

So far, all these features are considered beta for Laravel 11 and are designed to improve your workflow. Things can and probably change, and we will keep this post updated as new features are announced.

%[https://laravel-news.com/laravel-11]