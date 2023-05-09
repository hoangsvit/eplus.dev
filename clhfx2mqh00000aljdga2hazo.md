---
title: "Small but powerful CLI apps with Minicli"
seoTitle: "Small but powerful CLI apps with Minicli"
seoDescription: "Building CLI applications can be a lot of fun. We don't have to worry about the UI, and we can write beautiful PHP code that doesn't need any build steps."
datePublished: Tue May 09 2023 06:54:48 GMT+0000 (Coordinated Universal Time)
cuid: clhfx2mqh00000aljdga2hazo
slug: small-but-powerful-cli-apps-with-minicli
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1683615075700/855e124c-0db5-43cc-abee-662f474b491a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1683615261761/40d6aca3-f786-4a4e-be9f-f5b17d3249ed.png
tags: laravel, cli

---

Building CLI applications can be a lot of fun. We don't have to worry about the UI, and we can write beautiful PHP code that doesn't need any build steps.

When building CLI applications in PHP, we aren't as spoilt for choice as in building web applications - but there are some solid contenders. From using the defacto standard Symfony Console component or the extra spicy Laravel Zero. However, when building a CLI application, you may want to be as dependency free as possible - which is where Minicli comes in. [**Minicli**](https://github.com/minicli/minicli) was released a while ago by [**Erika Heidi**](https://twitter.com/erikaheidi) as an experiment to build a dependency-free CLI framework that leaned on PHPs readline extension as its only dependency.

I have been spending a lot of time investigating CLI options for a project I am working on. At first, I started with my usual choice: Laravel Zero. It is familiar to me and any other developer who knows Laravel. Then I started questioning the portability aspect and requiring PHP for people who want to use it. This is for work, and not all of our users have PHP installed. So I dived into the world of compiled languages, looking at both GoLang and Rust. While there aren't many options available, the options out there are excellent.

There has been a lot of talk about native PHP recently, which drew my attention back toward the PHP space. What if I could build a lightweight, easy-to-maintain, and portable PHP CLI application? This was when I took another look at Minicli. Having played with it when it first came out, I was impressed with how nice it was to use for something dependency free - but also how easy it was to get started!

The recommended approach for building a Minicli application is to use the application skeleton and composer to set everything up and ready for you.

```bash
composer create-project --prefer-dist minicli/application my-awesome-idea
```

The directories should be familiar enough for you as Laravel developers, having an `app` directory and namespace. The commands you can create are recommended to be built as `Command Controllers`, which are class-based commands.

We create a command namespace under `app/Commands`, where you keep your commands.

```bash
mkdir app/Commands/LaravelNews
```

Under each namespace, you can add multiple commands for different variations. It is inferred that if no arguments are passed, you will want to use the `DefaultController`. Let's have a look at how to create a command.

```php
declare(strict_types=1);
 
namespace App\Command\LaravelNews;
 
use Minicli\Command\CommandController;
 
final class DefaultController extends CommandController
{
    public function handle(): void
    {
        $this->getPrinter()->display("Laravel News rocks");
    }
}
```

Each command controller must be `handled` and doesn't have to return anything - unlike in Symfony or Laravel Zero, where an exit code is expected. To interact with output, you get the printer - and ask it to output something.

So, if we want to add an alternative version - we can create another command controller in our namespace.

```php
declare(strict_types=1);
 
namespace App\Command\LaravelNews;
 
use Minicli\Command\CommandController;
 
final class InfoController extends CommandController
{
    public function handle(): void
    {
        $this->getPrinter()->info("Laravel News rocks");
    }
}
```

Now we can call our command:

```bash
./minicli laravel-news info
```

Which will give a different view to the default command, and we can use the following other options:

`display()`: A simple text output.  
`info()`: An informative text output.  
`error()`: An error formatted text output.  
`success()`: A success formatted text output.

Each option accepts a second argument as `alt` for alternative output, which will do a block color output with writing instead of colored writing.

It isn't as pretty as something like Laravel Zero using Termwind - but sometimes you don't need pretty!

Usually, when building a CLI application, we want to interact with a third-party API or another service to perform an action or logic. In Minicli, this is done by creating services.

```php
// minicli
$app = new App();
$app->registerService(
    'email',
        new MyEmailImplementation(),
);
```

Then within our commands, we can get the app instance and call our service directly:

```php
public function handle(): void
{
    $service = $this->getApp()->email;
 
    try {
        $service->send(new EmailTemplate());
    } catch (Throwable $exception) {
        $this->getPrinter()->error($exception->getMessage());
    }
}
```

So we have a lightweight, powerful CLI framework that we can leverage to aid in our development workflow - that has no dependencies allowing us to write beautiful PHP.

Have you tried Minicli yet? Have you used anything similar? Let us know on twitter!

Source:

%[https://laravel-news.com/small-but-powerful-cli-apps-with-minicli]