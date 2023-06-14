---
title: "Deploy a PHP Web App with Laravel and Docker"
seoTitle: "Deploy a PHP Web App with Laravel and Docker"
seoDescription: "Laravel is one of the most popular web frameworks for PHP and for good reason. It comes bundled with most common web app needs, including authentication, au"
datePublished: Wed Jun 14 2023 03:53:55 GMT+0000 (Coordinated Universal Time)
cuid: cliv6gost00040al26fpv1uv8
slug: deploy-a-php-web-app-with-laravel-and-docker
canonical: https://render.com/docs/deploy-php-laravel-docker
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1686714750518/d13167e4-e6de-402e-b43f-eec68f1fc97a.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1686714775632/ecb00cf1-767a-406b-8081-7cbbe8fe33df.webp
tags: laravel, docker, laravelframework

---

[Laravel](https://laravel.com/) is one of the most popular web frameworks for PHP and for good reason. It comes bundled with most common web app needs, including authentication, authorization, localization, and support for multiple database backends including PostgreSQL.

In this guide, we’re going to deploy a simple [Laravel 10x](https://laravel.com/docs/10.x/) web app using Render’s native [PostgreSQL](https://render.com/docs/databases) and Docker support.

Let’s get started!

1. [Create](https://dashboard.render.com/new/database) a new PostgreSQL database on Render and copy the internal DB URL to use below.
    
2. Fork [hoangsvit/laravel-10x-docker](https://github.com/hoangsvit/laravel-10x-docker) and create a new **Web Service** on Render, giving Render permission to access your forked repo.
    
3. Select `Docker` for the runtime, and add the following environment variables under the *Advanced* section:
    
    | KEY | VALUE |
    | --- | --- |
    | `DATABASE_URL` | The **internal database URL** for the database you created above. |
    | `DB_CONNECTION` | `pgsql` |
    | `APP_KEY` | Copy the output of `php artisan key:generate --show` |
    

That’s it! Your Laravel web app will be live on your Render URL as soon as the build finishes. You can test it out by registering and logging in.

## **Modifying an Existing Laravel App for Render**

The [commit history](https://github.com/hoangsvit/laravel-10x-docker/commits/main) of our sample repo is useful in understanding the modifications needed for an existing Laravel app.

If you haven’t already, make sure to run `php artisan make:auth` to generate authentication scaffolding for your app.

1. Force HTTPS on all assets served by Laravel to avoid mixed content warnings in the browser. Render already manages and terminates TLS certificates for you, but Laravel’s [asset helper](https://laravel.com/docs/5.8/helpers#method-asset) needs to be configured to serve everything over TLS. You can do this by following the changes in [Force HTTPS for Laravel](https://github.com/render-examples/php-laravel-docker/commit/27a895df86bc8604c7985af4649bcac8cd2ad1e8).
    
    In the end, the contents of `app/Providers/AppServiceProvider.php` should look something like this:
    
    ```php
    namespace App\Providers;
    
    use Illuminate\Routing\UrlGenerator;use Illuminate\Support\ServiceProvider;
    
    class AppServiceProvider extends ServiceProvider
    {
        // ...
    
        public function boot(UrlGenerator $url)
        {
            if (env('APP_ENV') == 'production') {
                $url->forceScheme('https');
            }
        }
    }
    ```
    
2. Configure your repo to deploy Laravel using Docker and NGINX. We’re building on the [nginx-php-fpm](https://gitlab.com/ric_harvey/nginx-php-fpm) Docker image as [shown here](https://github.com/hoangsvit/laravel-10x-docker/blob/main/Dockerfile), and adding [php-fpm configuration for NGINX](https://github.com/hoangsvit/laravel-10x-docker/blob/main/conf/nginx/nginx-site.conf) to tie everything together.
    
    Make sure to add the [.dockerignore](https://github.com/hoangsvit/laravel-10x-docker/blob/main/.dockerignore) file to your repo to avoid adding unnecessary or confidential information to your Docker image.
    
3. Finally, add [a deploy script](https://github.com/hoangsvit/laravel-10x-docker/blob/main/scripts/00-laravel-deploy.sh) that will be run when your PHP app starts up.
    
    ```bash
    #!/usr/bin/env bash
    echo "Running composer"
    composer global require hirak/prestissimo
    composer install --no-dev --working-dir=/var/www/html
    
    echo "Caching config..."
    php artisan config:cache
    
    echo "Caching routes..."
    php artisan route:cache
    
    echo "Running migrations..."
    php artisan migrate --force
    ```
    

You should now be able to deploy your existing Laravel app on Render.