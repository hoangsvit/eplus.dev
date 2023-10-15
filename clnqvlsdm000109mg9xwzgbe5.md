---
title: "LangCountry: Laravel Localization Made Effortless"
seoTitle: "LangCountry: Laravel Localization Made Effortless"
seoDescription: "LangCountry is a Laravel localization package that streamlines the process of handling localization tasks, including automatic date formatting, language swi"
datePublished: Sun Oct 15 2023 02:57:24 GMT+0000 (Coordinated Universal Time)
cuid: clnqvlsdm000109mg9xwzgbe5
slug: langcountry-laravel-localization-made-effortless
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1697338286646/58b454a9-8c24-458f-999c-6dcb84888993.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1697338626363/2ab715f3-9dd7-46ea-8e83-baf2cbd52d0b.png
tags: laravel, localization, laravel-packages, langcountry

---

LangCountry is a Laravel localization package that streamlines the process of handling localization tasks, including automatic date formatting, language switching, and more. Setting up language detection and configuration can be a cumbersome task, making this package a valuable tool for managing multiple locales efficiently. Here are some key features of LangCountry:

* Configuration for a customizable set of supported languages and countries.
    
* Automatic language detection is based on the user's browser settings.
    
* Middleware that sets the user's locale and country.
    
* An optional UI component for language switching.
    
* Helpers with date/time formatting, language, and currency.
    
* Capability to store the user's preferred language in the database.
    
* And additional functionalities.
    

The optional language switcher UI is a feature that can be presented to users or utilized as a development tool for quick language testing. The provided middleware is quite handy as it automates language preference and country detection for users. You can specify a fallback locale, which the middleware will use in case of no language and country match. Additionally, it checks for translations in the selected locale and sets the Laravel application locale accordingly if found.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1697338532246/41a9dae2-8941-4dd1-b0ab-0b7abf4d5faf.webp align="center")

Moreover, LangCountry offers convenient date, time, and language helpers that can enhance your application:

* For example, `LangCountry::dateNumbers($post->created_at)` will format the date based on the provided locale.
    
    ```basic
    // nl-NL will return "27-09-2023"
    // en-US will return "09/27/2023"
    // de-DE will return "27.09.2023"
    ```
    
* `LangCountry::dateBirthday($user->date_of_birth)` formats the birthday date accordingly.
    
    ```basic
    // nl-NL will return "27 september"
    // en-US will return "September 27th"
    ```
    
* `LangCountry::emojiFlag()` provides the emoji flag based on the locale.
    
    ```basic
    // en-GB will return "🇬🇧"
    // nl-NL will return "🇳🇱"
    ```
    

The package's [official documentation](https://stefro.github.io/laravel-lang-country/) includes a comprehensive list of helpers with detailed usage and installation instructions. Please note that this package is compatible with Laravel 10 and requires at least PHP 8.1. If you're using an older Laravel version, a specific version of the package is available. You can access the [source code](https://github.com/stefro/laravel-lang-country) on GitHub for further exploration.