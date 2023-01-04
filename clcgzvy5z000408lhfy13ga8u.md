# Spin up your development background processes with ease

[**Porter**](https://github.com/anystack-sh/porter) is a command line tool that makes it easy to run background services with only a few configuration lines. You will no longer have to start or manage background services in multiple tabs manually but instead, manage them all in one convenient place.

Porter uses YAML configuration files to define services you need to run in the background for your development environment and manages them for you via Supervisord and Chokidar.

Here's an example from the project's readme, which makes it convenient to share a `porter.yml` file with your team with version control:

```apache
services:
  - name: Queue
    command: php artisan horizon
    restart:
        watch:
            - app/Jobs
            - app/Mail/WelcomeEmail.php
 
  - name: Vite
    command: npm run dev
 
  - name: Octane
    command: php artisan octane:start --port=8000 --no-interaction
 
  - name: Stripe
    command: stripe listen --forward-to localhost:8000/webhooks/stripe
    restart:
      minutes: 5
```

To get started, you can initialize a `porter.yml` file in your project using the `porter init` command. From there, you can stop, start, add, restart, tail processes, and get process statuses with porter:

```apache
# Tail one or more background services
porter tail
 
# Get the status of all configured services
porter status
 
# Start, stop, and restart all services
porter start
porter stop
porter restart
```

You can learn more about this package, get full installation instructions, and view the [**source code**](https://github.com/anystack-sh/porter) on GitHub.

Source:

%[https://laravel-news.com/porter-cli]