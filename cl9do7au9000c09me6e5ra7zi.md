---
title: "Import Laravel Vapor DNS to Cloudflare"
seoTitle: "Import Laravel Vapor DNS to Cloudflare"
seoDescription: "Orrison/Cumulus is an open-source package that works with Laravel Vapor to allow the user to manage their DNS records better when using Cloudflare for DNS"
datePublished: Tue Oct 18 2022 03:53:18 GMT+0000 (Coordinated Universal Time)
cuid: cl9do7au9000c09me6e5ra7zi
slug: import-laravel-vapor-dns-to-cloudflare
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1666064905784/qi4HK59rK.jpg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1666065162699/f23Mc298T.jpg
tags: laravel

---

[Orrison/Cumulus](https://github.com/Orrison/cumulus) is an open-source package that works with Laravel Vapor to allow the user to manage their DNS records better when using Cloudflare for DNS. When a custom domain is added in Laravel Vapor, assigned to a project environment, and deployed, Laravel Vapor will automatically set up the proper DNS records in Route 53. Laravel Vapor will then display these records via the UI or Vapor CLI tool, which you would then have to copy manually into Cloudflare.

Trying to manage DNS information from Vapor to Cloudflare without Orrison/Cumulus can open your data up to risks such as human error and wasted time since it would need to be copied over manually. In its essence, Orrison/Cumulus is an open-source tool that automatically copies the proper DNS records from Laravel Vapor to Cloudflare.

## How it works

Before you can effectively use Orrison/Cumulus, you will need to have a valid [Cloudflare API Access Token](https://developers.cloudflare.com/api/tokens/create), the domain setup as a zone in your Cloudflare account, and a fully installed and authenticated [Laravel Vapor CLI](https://docs.vapor.build/1.0/introduction.html#installing-the-vapor-cli). Once this is complete, you're ready to input the Orrison/Cumulus package commands.

When obtaining the Cloudflare API Access Token, the ["Edit DNS Zone"](https://dash.cloudflare.com/profile/api-tokens) template is a perfect token template to use. You will need to set the "Zone Resources" options to either "All Zones" or the correct option for your use case.

To start using this package, you will first need to install it using Composer:

```
composer global require orrison/cumulus --with-all-dependencies
``` 

Once installed, the first step is to add the Cloudflare API Token. You can add the token using: Cumulus Cloudflare:login.

After adding and authenticating the Cloudflare API Token, you're ready to run the import command. For example, to import the DNS records for your domain "example.com," you would run: cumulus Cloudflare:import example.com.

Subdomains are DNS records of the root domain, so you can assign a subdomain to a project environment and import its DNS records by running the import command for the root domain. For example, if you have assigned a custom domain "sub.example.com" to a project environment in Laravel Vapor. You can import its DNS records by running: Cumulus Cloudflare:import example.com.

## Why use Laravel Vapor

As a serverless deployment platform for Laravel, Vapor brings many impactful benefits such as a scaling cloud framework for your application, databases, caches, metrics, automatic asset uploading, and more. Laravel Vapor offers multiple environments, rapid rollbacks, infinite deployments, and an ever-expanding library of tools.

## Why use Cloudflare

Cloudflare offers sophisticated security and performance systems for websites, APIs, and applications. Operating entirely in the cloud, Cloudflare gives you an integrated set of L3-L7 network services that are easy to configure, use, and maintain. Allowing users to lower the risk of DDoS attacks, cache static content, route through many network paths, and optimize across devices, this content delivery network or CDN offers incredible security and speed advantages. Using Cloudflare is almost necessary when using API Gateway V2 in Laravel Vapor. It's one of the best ways to add automatic HTTP to HTTPS redirects that aren't available in API Gateway V2.

## Conclusion

When looking to optimize your site or application, using a combination of Laravel Vapor and Cloudflare can be a powerful way to ensure security, speed, database scaling, and in-depth analytic capabilities. That said, using the Orrison/Cumulus package ensures that these tools run together seamlessly when utilizing a custom domain or subdomains. Additional commands and info can be found in [the project](https://github.com/Orrison/cumulus#readme).

Source: [https://laravel-news.com/orrison-cumulus](https://laravel-news.com/orrison-cumulus)

