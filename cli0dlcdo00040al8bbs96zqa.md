---
title: "Laravel Love: Expressing Emotions in Your Application"
seoTitle: "Laravel Love: Expressing Emotions in Your Application"
seoDescription: "Laravel Love is the emotional part of the application. It lets people express how they feel about the content. Make any model reachable in minutes!"
datePublished: Tue May 23 2023 14:32:38 GMT+0000 (Coordinated Universal Time)
cuid: cli0dlcdo00040al8bbs96zqa
slug: laravel-love-expressing-emotions-in-your-application
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1684851524512/430f8b7c-bafb-4da5-a048-f823c933c5fa.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1684852296712/675ad7c4-1fcd-4f20-862b-324621e30dbd.jpeg
tags: laravel, composer, laravel-packages

---

Laravel Love is the emotional part of the application. It lets people express how they feel about the content. Make any model reachable in minutes!

There are many different implementations in modern applications:

* GitHub Reactions
    
* Facebook Reactions
    
* YouTube Likes
    
* Slack Reactions
    
* Reddit Votes
    
* Medium Claps
    
* Disqus Reactions
    

This package was developed with the mind that it should cover all the possible use cases and be viable in enterprise applications.

## Features

* Fully customizable types of reactions.
    
* Any model can react to models and receive reactions at the same time.
    
* Reactants can have many types of reactions.
    
* Reacter can add many reactions to one reactant.
    
* Reacter can react with custom float rate value.
    
* Reaction counters with detailed aggregated data for each reactant.
    
* Reaction totals with total aggregated data for each reactant.
    
* Works with any database `id` column type.
    
* Sort retractable models by reaction type count.
    
* Sort retractable models by reaction total count.
    
* Sort retractable models by reaction total weight.
    
* Events for added & removed reactions.
    
* Artisan command `love:recount {model?} {type?}` to re-fetch reaction stats.
    
* Artisan command `love:reaction-type-add` to add reaction types.
    
* Artisan command `love:setup-reacterable` to register Reacterable models.
    
* Artisan command `love:setup-reactable` to write Reactable models.
    
* Customizable database storage.
    

## System Design

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1684851682278/19810811-0273-426e-a2d0-2323f94eee4e.png align="center")

### Glossary

`Reaction` — the response that reveals Reacter's feelings or attitude to the Reactant.

`Reacter` — one who reacts.

`Reacterable` — model which can act as `Reacter` on the application level.  
**Example:** `User`, `Person`, `Organization`, etc

`Reactant` — subject which could receive Reactions.

`Reactable` — model which can act as `Reactant` on the application level.  
**Example:** `Post`, `Comment`, `User`, etc

`ReactionType` — type of the emotional response.  
**Example:** Like, Dislike, Love, Sad, etc

`Reaction Rate` — the velocity of an reactant becoming popular.

`ReactionType Mass` — amount of weight added to the Reaction.

`Reaction Weight` — ReactionType Mass \* Reaction Rate.

`ReactionCounter` — aggregated statistical values of ReactionTypes related to the Reactant.

`ReactionTotal` — aggregated statistical values of total reactions count & their weight related to the Reactant.

### Database Schema

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1684851753290/6acf43c4-5dac-4af1-a1bb-f0b48b598be5.png align="center")

## Implementation Highlights

### Frameworks Integration

* Designed to work with Laravel Eloquent models.
    

### Code Concepts

* Strict typed code.
    
* Using Null Object design pattern instead of `null` values.
    
* Non extendable classes declared as final.
    
* Using contracts to keep high customization capabilities.
    
* Using traits to get functionality out of the box.
    
* Throws only custom exceptions with `LoveThrowable` interface.
    
* Using Facade design pattern to expose simpler high-level API.
    

### Database

* Using database foreign keys to keep data integrity.
    
* All database tables have `love_` prefix.
    

### Testing

* Covered with PHPUnit tests.
    

### Follows PHP Standard Recommendations

* [PSR-1 (Basic Coding Standard)](http://www.php-fig.org/psr/psr-1/).
    
* [PSR-2 (Coding Style Guide)](http://www.php-fig.org/psr/psr-2/).
    
* [PSR-4 (Autoloading Standard)](http://www.php-fig.org/psr/psr-4/).
    

## System Requirements

Laravel Love has a few requirements you should be aware of before installing:

* PHP 8+
    
* [Composer](https://getcomposer.org/)
    
* Laravel Framework 9+
    

## Installation Instructions

Pull in the package through Composer.

```apache
composer require cybercog/laravel-love
```

Run database migrations.

```apache
php artisan migrate
```

### Manage Reaction Types

Reaction type required to react to content.

Create a list of default reaction types (Like & Dislike) or create your own build!

### Add Default Types

```apache
php artisan love:reaction-type-add --default
```

In Artisan execute `love:reaction-type-add` command with `--default` flag to add `Like` and `Dislike` types to application. Reactant's total mass increments `+1` with each `Like` and decrements `-1` with `Dislike`.

> 📘 If any of `Like` or `Dislike` types already exists in application - command will add only missing one.

### Add Custom Type

```apache
php artisan love:reaction-type-add
```

> 📘Type names transformed to StudlyCase.  
> Name `very-good` will be converted to `VeryGood`.

Pass `name` & `mass` arguments in command line to skip interaction.

```apache
php artisan love:reaction-type-add --name=Hate --mass=-4
```

## Setup Reacterable

`User` model cannot directly react to the content. It should delegate this job to related `Reacter` model.

### Code Changes

1. Declare that model implements `Cog\Contracts\Love\Reacterable\Models\Reacterable` contract.
    
2. Use `Cog\Laravel\Love\Reacterable\Models\Traits\Reacterable` trait or implement each method of the contract by yourself.
    

As result you will have:

```php
<?php

namespace App\Models;

use Cog\Contracts\Love\Reacterable\Models\Reacterable as ReacterableInterface;
use Cog\Laravel\Love\Reacterable\Models\Traits\Reacterable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements ReacterableInterface
{
    use Reacterable;
}
```

### Database Changes

1. Run set up reacterable command.
    

```apache
php artisan love:setup-reacterable --model="App\Models\User"
```

> 📘Add `--nullable` flag if all models of this type must NOT be reacterable:

```apache
$ php artisan love:setup-reacterable --model="App\Models\User" --nullable
```

> 📘Manual migration creation described in [Custom Setup Migrations](https://laravel-love.readme.io/docs/custom-setup-migrations).

1. Run migration.
    

```apache
php artisan migrate
```

### Creating Reacter Models

If you are integrating package on already existing user base you need to register your Reacterable models as Reacters.

```apache
php artisan love:register-reacters --model="App\Models\User"
```

This command will create Reacter model for each User model.

### Setup Reactable

`Comment` model cannot receive reactions directly. It should delegate this job to related `Reactant` model.

Add `Reactable` interface & trait to your `Comment` model code and run artisan setup command to make a link with `Reactant` model.

## Code Changes

1. Declare that model implements `Cog\Contracts\Love\Reactable\Models\Reactable` contract.
    
2. Use `Cog\Laravel\Love\Reactable\Models\Traits\Reactable` trait or implement each method of the contract by yourself.
    

As result you will have:

PHP

```php
<?php

namespace App\Models;

use Cog\Contracts\Love\Reactable\Models\Reactable as ReactableInterface;
use Cog\Laravel\Love\Reactable\Models\Traits\Reactable;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model implements ReactableInterface
{
    use Reactable;
}
```

## Database Changes

1. Run set up reactable command.
    

```apache
php artisan love:setup-reactable --model="App\Models\Comment"
```

> 📘 Add `--nullable` flag if all models of this type must NOT be reactable:

```apache
php artisan love:setup-reactable --model="App\Models\Comment" --nullable
```

> 📘 Manual migration creation described in [Custom Setup Migrations](https://laravel-love.readme.io/docs/custom-setup-migrations).

1. Run migration.
    

```apache
php artisan migrate
```

## Creating Reactant Models

If you are integrating package on already existing user base you need to register your Reactable models as Reactants.

```apache
php artisan love:register-reactants --model="App\Models\Comment"
```

This command will create Reactant model for each Comment model.

## Alternatives

* [cybercog/laravel-likeable](https://github.com/cybercog/laravel-likeable)
    
* [rtconner/laravel-likeable](https://github.com/rtconner/laravel-likeable)
    
* [faustbrian/laravel-likeable](https://github.com/faustbrian/Laravel-Likeable)
    
* [sukohi/evaluation](https://github.com/SUKOHI/Evaluation)
    
* [zvermafia/lavoter](https://github.com/zvermafia/lavoter)
    
* [francescomalatesta/laravel-reactions](https://github.com/francescomalatesta/laravel-reactions)
    
* [muratbsts/laravel-reactable](https://github.com/muratbsts/laravel-reactable)
    
* [hkp22/laravel-reactions](https://github.com/hkp22/laravel-reactions)[  
    ](https://laravel-love.readme.io/edit/alternatives)[  
    ](https://laravel-love.readme.io/edit/manage-reaction-types)[  
    ](https://laravel-love.readme.io/edit/installation-instructions)