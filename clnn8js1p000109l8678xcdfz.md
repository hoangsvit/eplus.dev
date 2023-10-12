---
title: "Build a simple Laravel development environment with docker-compose"
seoTitle: "Build a simple Laravel development environment with docker-compose"
seoDescription: "Build a simple Laravel development environment with docker-compose. Compatible with Windows(WSL2), macOS(M1) and Linux."
datePublished: Thu Oct 12 2023 13:48:41 GMT+0000 (Coordinated Universal Time)
cuid: clnn8js1p000109l8678xcdfz
slug: build-a-simple-laravel-development-environment-with-docker-compose
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1697118372902/29cbdedb-01d2-485b-a059-95d70c75c139.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1697118501721/513f9fc9-cc2a-45cd-b681-4d5e0518cd31.png
tags: laravel, docker

---

## Introduction

Build a simple Laravel development environment with docker-compose. Compatible with Windows(WSL2), macOS(M1) and Linux.

## Usage

### Laravel install

1. Click [Use this template](https://github.com/ucan-lab/docker-laravel/generate)
    
2. Git clone & change directory
    
3. Execute the following command
    

```apache
make create-project

# or...

mkdir -p src
docker compose build
docker compose up -d
docker compose exec app composer create-project --prefer-dist laravel/laravel .
docker compose exec app php artisan key:generate
docker compose exec app php artisan storage:link
docker compose exec app chmod -R 777 storage bootstrap/cache
docker compose exec app php artisan migrate
```

[http://localhost](http://localhost)

### Laravel setup

1. Git clone & change directory
    
2. Execute the following command
    

```apache
make install
```

[http://localhost](http://localhost)

## Tips

* Read this [Makefile](https://github.com/ucan-lab/docker-laravel/blob/main/Makefile).
    
* Read this [Wiki](https://github.com/ucan-lab/docker-laravel/wiki).
    

## Container structures

```plaintext
├── app
├── web
└── db
```

### app container

* Base image
    
    * [php](https://hub.docker.com/_/php):8.2-fpm-bullseye
        
    * [composer](https://hub.docker.com/_/composer):2.6
        

### web container

* Base image
    
    * [nginx](https://hub.docker.com/_/nginx):1.25
        

### db container

* Base image
    
    * [mysql/mysql-server](https://hub.docker.com/r/mysql/mysql-server):8.0
        

### mailpit container

* Base image
    
    * [axllent/mailpit](https://hub.docker.com/r/axllent/mailpit)
        

Source:

%[https://github.com/ucan-lab/docker-laravel]