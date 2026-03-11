# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Repository

This is a **reference repository**, not a runnable application. It contains customized files that are downloaded into a fresh Laravel 12 application. The stack is Laravel 12 + Inertia.js + React + TypeScript + Pest.

## Commands

### PHP

```bash
composer analyze          # Larastan static analysis (PHPStan level 5)
composer analyze:baseline # Generate PHPStan baseline
composer format           # Laravel Pint PHP formatter
```

### JavaScript/TypeScript

```bash
npm run dev        # Vite dev server
npm run build      # Production build
npm run lint       # ESLint
```

### Testing

```bash
php artisan test                           # Run all tests
php artisan test --filter="test name"      # Run a specific test
php artisan test tests/Feature/Auth/       # Run a specific folder
```

### Husky Git Hooks

- **pre-commit**: Prettier + ESLint (via lint-staged, scoped to staged files)
- **pre-push**: Laravel Pint + Larastan

## Architecture & Conventions

### User Model Customizations

The `User` model deviates from Laravel defaults in important ways:

- Uses `first` and `last` fields instead of a single `name` field
- Timestamps use custom column names: `date_created` (created_at) and `last_updated` (updated_at)
- Uses `$guarded` instead of `$fillable`
- Includes `TwoFactorAuthenticatable` trait (Laravel Fortify)

These customizations cascade to the users migration, UserFactory, ProfileUpdateRequest, and all React components that reference user properties.

### Frontend Structure (`resources/js/`)

- `components/` — Shared UI components (shadcn/ui based)
- `pages/` — Inertia page components, organized by feature (`auth/`, `settings/`)
- `types/index.d.ts` — TypeScript interfaces (`User`, `Auth`, `SharedData`, `NavItem`, etc.)

The `User` TypeScript interface uses `first`/`last` instead of `name` — always use these fields when referencing user display names.

### Code Quality Stack

- **Laravel Pint** — PHP formatting (`pint.json`: Laravel preset + `concat_space` with one space)
- **ESLint** — TypeScript + React rules, Prettier-compatible (`eslint.config.mjs`)
- **Larastan** — PHPStan level 5, scans `app/` only (`phpstan.neon`)
- **lint-staged** — Runs formatters/linters on staged files only

### CI/CD

- Pull requests to `main` trigger: branch validation, lint, Larastan analysis, and Pest tests
- Deploys trigger on GitHub Release publish, after audit + tests pass
- Reusable workflows from `dascentral/reusable-workflows` — PHP 8.4, Node 22.20.0, MySQL 8.0

### Environment Configuration

Key non-default `.env` settings this starter applies:

- `CACHE_STORE=redis`
- `DB_CONNECTION=mysql`
- `QUEUE_CONNECTION=sync` (use `redis` + Horizon in production)
- `SESSION_DRIVER=redis`
