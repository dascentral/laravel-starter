# Laravel Starter

## Introduction

Rather than having a template repository for new Laravel Projects, I’m going after a step-by-step script that outlines the changes that I typically make and why. I feel this approach will be easier to maintain and will provide more value to guests.

This repository customizes a new [Laravel 12](https://laravel.com/docs/12.x) application.

## Starter Kit

In 2024, the Laravel Team launched [starter kits](https://laravel.com/starter-kits) that enable you to get a new Laravel application up and running real fast with the stack of your choice. I go with an Inertia.js + React + Pest stack.

```bash
laravel new <name> --react --pest
```

This starter repo is specific to that stack, but it may have conventions that benefit any Laravel application.

## Cursor / VS Code

I currently use [Cursor](https://www.cursor.com/) as my IDE. The repository contains my preferred settings and extensions within the `.vscode` folder.

## Code Quality

A new Laravel application comes with [Prettier](https://prettier.io), [ESLint](https://eslint.org/), and [Laravel Pint](https://laravel.com/docs/12.x/pint) to maximize code quality by analyzing your code to detect issues.

This repository contains my preferred configuration files for each tool. You can download these files into your repository via the following command:

```bash
# .prettierrc
curl -o pint.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/.prettierrc

# esling.config.js
curl -o pint.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/eslint.config.js

# pint.json
curl -o pint.json https://raw.githubusercontent.com/dascentral/laravel-starter/refs/heads/main/pint.json
```
