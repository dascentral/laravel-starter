# Laravel Starter

## Introduction

In 2024, the Laravel team launched [starter kits](https://laravel.com/starter-kits) that enable you to get a new Laravel application up and running quickly with the stack of your choice.

My preferred Laravel stack includes:

- [Inertia.js](https://inertiajs.com)
- [React](https://react.dev)
- [Pest](https://pestphp.com)
- [Laravel Boost](https://laravel.com/ai/boost)

While I try very hard to embrace the framework defaults, I still make several customizations to the default installation. Rather than creating my own starter kit or template repository, I have simply inventoried the changes here. Modified files live in this repository for reference and ease of download into a new or existing application.

Instructions are accurate as of March 2026 for a [Laravel 12](https://laravel.com/docs/12.x) application powered by my preferred stack.

### Resources

- [Essentials](https://laravel-news.com/laravel-essentials) &mdash; This package, created by Nuno Maduro, provides better defaults for your Laravel applications.
- [The Next Step After Fresh Laravel Installation: Setting Up Your AppServiceProvider](https://medium.com/the-artisans-journal/the-next-step-after-fresh-laravel-installation-setting-up-your-appserviceprovider-a010cb69214e) &mdash; Great inventory of suggestions for additional modifications you can consider making to your `AppServiceProvider` immediately after creating a new Laravel application.

### The Future

Given the advancement in AI code gen technology, I will be keeping a very close eye on prompts or skills that bring these customizations to bear.

## Creating a New Application

The following command will generate a fresh [Laravel 12](https://laravel.com/docs/12.x) application.

This command will create a new application using that stack and initialize a Git repo.

```bash
laravel new --git --react --npm --pest --boost <name>
```

## Application Configuration

Execute the following command to download the custom `.env.example`:

```bash
curl -o .env.example https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.env.example
```

The Laravel Installer generates an `APP_KEY` value for you automatically. You can run the following from the root of the repo to refresh your `.env` and create a new `APP_KEY` before applying your custom values.

```bash
cp .env.example .env && php artisan key:generate
```

I try really hard to embrace the framework defaults. However, I do make a few modifications that include:

- `CACHE_STORE` &mdash; Set to `redis`. I use this locally and in production.
- `DB_CONNECTION` &mdash; Set to `mysql`
- `QUEUE_CONNECTION` &mdash; Set to `sync`. In production, I use `redis` and [Laravel Horizon](https://laravel.com/docs/12.x/horizon).
- `SESSION_DRIVER` &mdash; Set to `redis`

The following variables will inevitably require a custom value:

- `APP_NAME`
- `APP_URL`
- `DB_NAME`

## IDE Configuration

I currently use [Cursor](https://www.cursor.com/) as my IDE. This repository contains a `.vscode` folder that contains my preferred settings and extensions.

To replicate this setup within your project:

```bash
mkdir -p .vscode && \
curl -o .vscode/extensions.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.vscode/extensions.json && \
curl -o .vscode/settings.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.vscode/settings.json
```

## Code Quality

A new Laravel application comes with [Prettier](https://prettier.io), [ESLint](https://eslint.org/), and [Laravel Pint](https://laravel.com/docs/12.x/pint) to maximize code quality by analyzing your code to detect issues. It also contains a set of settings for [EditorConfig](https://editorconfig.org).

This repository contains my preferred configuration files for each tool. You can download these files into your repository via the following commands:

```bash
curl -o .editorconfig https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.editorconfig && \
curl -o .prettierrc https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.prettierrc && \
curl -o .prettierignore https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.prettierignore && \
curl -o eslint.config.mjs https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/eslint.config.mjs && \
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

### Husky

The Laravel starter kits use GitHub Actions to lint and test the code. While I still run tests in the CI/CD space, I prefer to use [Husky](https://typicode.github.io/husky/) to run ESlint, Prettier, Laravel Pint, and Larastan.

I use `pre-commit` to run ESLint and Prettier and `pre-push` for Laravel Pint and Larastan.

First, install Husky and [lint-staged](https://github.com/lint-staged/lint-staged). Then, issue the following commands from the root of the repo:

```bash
npm install --save-dev husky lint-staged && npx husky init
```

You can download the relevant files into your repository via the following commands:

```bash
curl -o lint-staged.config.mjs https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/lint-staged.config.mjs && \
curl -o .husky/pre-commit https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.husky/pre-commit && \
curl -o .husky/pre-push https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.husky/pre-push
```

After setting up Husky, you no longer need the lint workflow.

```bash
rm .github/workflows/lint.yml
```

## Composer Packages

### First-Party

I always install the following first-party packages:

- [Laravel Boost](https://github.com/laravel/boost)
- [Laravel Horizon](https://laravel.com/docs/12.x/horizon)
- [Laravel Pulse](https://laravel.com/docs/12.x/pulse)
- [Laravel Telescope](https://laravel.com/docs/12.x/telescope)

```bash
composer require laravel/horizon laravel/pulse laravel/telescope && \
php artisan horizon:install && \
php artisan vendor:publish --provider="Laravel\Pulse\PulseServiceProvider" && \
php artisan telescope:install && \
php artisan migrate:fresh --seed
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
composer require -W spatie/laravel-backup spatie/laravel-data spatie/laravel-ray spatie/laravel-view-models predis/predis && \
composer require -W --dev pestphp/pest-plugin-faker
```

The following packages require additional steps to complete installation. See their docs for details.

- [spatie/laravel-backup](https://spatie.be/docs/laravel-backup/v9/introduction)

### Laravel Nova

[Laravel Nova](https://nova.laravel.com) is the simplest and fastest way to build production-ready administration panels using Laravel.

Since Nova is a paid package, installation is a little more in-depth than a simple `composer require` command. First, add the repository to your `composer.json`:

```bash
composer config repositories.nova '{"type": "composer", "url": "https://nova.laravel.com"}' --file composer.json
```

Ensure you have a valid `auth.json` configured for installation, and then add `laravel/nova` to your list of required packages in your `composer.json` file:

```bash
composer require laravel/nova
```

## Composer Scripts

I will manually add the following scripts to the `composer.json`:

```json
"analyze": [
  "./vendor/bin/phpstan analyse --ansi --memory-limit 512M"
],
"analyze:baseline": [
  "./vendor/bin/phpstan analyse --generate-baseline"
],
"format": [
  "./vendor/bin/pint"
],
```

## GitHub Workflows

I have created several resuable workflows that facilitate pull requests and deployments to my Digital Ocean web servers.

```bash
mkdir -p .github/workflows && \
curl -o .github/workflows/deploy.yml https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/workflows/deploy.yml && \
curl -o .github/workflows/pull-request.yml https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/workflows/pull-request.yml
```
