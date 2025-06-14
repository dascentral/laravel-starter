# Laravel Starter

## Introduction

Rather than having a template repository for new Laravel Projects, I’m going after a step-by-step script that outlines the changes that I typically make and why. I feel this approach will be easier to maintain and will provide more value to guests.

This repository customizes a new [Laravel 12](https://laravel.com/docs/12.x) application. Instructions are accurate as of June 2025.

## Create New Application

In 2024, the Laravel Team launched [starter kits](https://laravel.com/starter-kits) that enable you to get a new Laravel application up and running real fast with the stack of your choice. I go with an Inertia.js + React + Pest stack.

```bash
laravel new --react --pest <name>
```

This starter repo is specific to that stack, but it may have conventions that benefit any Laravel application.

## Cursor / VS Code

I currently use [Cursor](https://www.cursor.com/) as my IDE. The repository contains my preferred settings and extensions within the `.vscode` folder.

To replicate this set up within your project:

```bash
mkdir -p .vscode

curl -o .vscode/extensions.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.vscode/extensions.json

curl -o .vscode/settings.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.vscode/settings.json
```

## Code Quality

A new Laravel application comes with [Prettier](https://prettier.io), [ESLint](https://eslint.org/), and [Laravel Pint](https://laravel.com/docs/12.x/pint) to maximize code quality by analyzing your code to detect issues.

This repository contains my preferred configuration files for each tool. You can download these files into your repository via the following commands:

```bash
# .prettierrc
curl -o .prettierrc https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.prettierrc

# esling.config.js
curl -o eslint.config.js https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/eslint.config.js

# pint.json
curl -o pint.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/pint.json
```

### Larastan

[Larastan](https://github.com/larastan/larastan) is a [PHPStan](https://phpstan.org) extension and code analysis tool for Laravel. It focuses on finding errors in your code before you even write any tests.

```bash
composer require --dev "larastan/larastan:^3.0"
```

Larastan requires a `phpstan.neon` configuration file. You can review the [PHPStan documenation](https://phpstan.org/config-reference) to create a custom config, or you can download my default.

```bash
curl -o phpstan.neon https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/phpstan.neon
```

## Composer Packages

### First-Party

I always install the following first-party packages:

- [Laravel Horizon](https://laravel.com/docs/12.x/horizon)
- [Laravel Pulse](https://laravel.com/docs/12.x/pulse)
- [Laravel Telescope](https://laravel.com/docs/12.x/telescope)

```bash
# Laravel Horizon
composer require laravel/horizon
php artisan horizon:install

# Laravel Pulse
composer require laravel/pulse
php artisan vendor:publish --provider="Laravel\Pulse\PulseServiceProvider"
php artisan migrate

# Laravel Telescope
composer require laravel/telescope
php artisan telescope:install
php artisan migrate
```

### Third-Party

I always install the following third-party packages:

- [spatie/laravel-backup](https://spatie.be/docs/laravel-backup/v9/introduction)
- [spatie/laravel-data](https://spatie.be/docs/laravel-data/v4/introduction)
- [spatie/laravel-ray](https://myray.app/docs/php/laravel/installation)
- [spatie/laravel-view-models](https://github.com/spatie/laravel-view-models)
- [predis/predis](https://github.com/predis/predis)
- [pestphp/pest-plugin-faker](https://pestphp.com/docs/plugins#content-faker)

```bash
composer require spatie/laravel-backup spatie/laravel-data spatie/laravel-ray spatie/laravel-view-models predis/predis

composer require --dev pestphp/pest-plugin-faker
```

### Laravel Nova

[Laravel Nova](https://nova.laravel.com) is the simplest and fastest way to build production-ready administration panels using Laravel.

Since Nova is a paid package, installation is a little more in depth than a simple `composer require` command. First, add the repository to your `composer.json`:

```bash
composer config repositories.nova '{"type": "composer", "url": "https://nova.laravel.com"}' --file composer.json
```

Ensure you have a valid `auth.json` configured for installation and then add `laravel/nova` to your list of required packages in your `composer.json` file:

```bash
composer require laravel/nova
```

## User Model

I have a few preferences that require modifications to the `User` model that comes out-of-the-box with a new Laravel application.

### First and Last

The default `User` model in Laravel comes with a single `name` field. I prefer to split that into `first` and `last` fields. I have updated the `USERS` table migration, `User` model, `UserFactory`, and `DatabaseSeeder` accordingly.

### Timestamps

By default, Laravel expects `created_at` and `updated_at` columns to exist on a model's corresponding database table. I prefer to use `last_updated` and `date_created` field names for a model's timestamps.

I have updated the `users` table and `User` model accordingly.

### Guarded vs. Fillable

I prefer to use the `$guarded` model attribute as opposed to `$fillable` to manage [mass assignment protection](https://laravel.com/docs/12.x/eloquent#mass-assignment). As a result, I have updated the `User` model accordingly.

```php
    protected $guarded = [
        'id',
        'date_created',
        'last_updated',
    ];
```

### File Download

Execute the following commands to download these customizations into your project.

```bash
curl -o app/Models/User.php https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/app/Models/User.php

curl -o database/factories/UserFactory.php https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/database/factories/UserFactory.php

curl -o database/migrations/0001_01_01_000000_create_users_table.php https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/database/migrations/0001_01_01_000000_create_users_table.php

curl -o database/seeders/DatabaseSeeder.php https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/database/seeders/DatabaseSeeder.php
```

## Application Configuration

I try real hard to embrace the framework defaults. However, I do make a few modifications.

### App

I give the application a custom `APP_NAME` and `APP_URL` since those values will be unique per project.

### Cache

I run Redis across all environments and configure the `CACHE_STORE` accordingly.

```
CACHE_STORE="redis"
```

### Database

I also run MySQL across all environments and configure the `DB_CONNECTION` accordingly.

```
DB_CONNECTION="mysql"
```

### Queue

I prefer the `sync` queue connection in my local development environment so that I do not have to worry about running any queue workers.

```
# local development
QUEUE_CONNECTION="sync"
```

In production, I leverage Redis and [Laravel Horizon](https://laravel.com/docs/12.x/horizon).

```
# production
QUEUE_CONNECTION="redis"
```

### Session

You guessed it... I also use Redis for the Session driver.

```
SESSION_DRIVER="redis"
```
