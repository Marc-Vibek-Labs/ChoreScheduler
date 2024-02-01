# Database Migrations

## Overview

This a a guide and reference sheet about database migrations. You will find information about our setup, as well as how-tos, right in this README.

## Guide

### Relevant files and directories

All migration files live in `src/migrations`.

All configurations for Objection.js and Knex.js are in `src/config/database`.

- `knexfile.ts` holds configurations for setting up the Postgres connection via Knex.js.
- `index.ts` exports these configurations in a format suitable for `ConfigService`.
- `migrationStub.ts` is a starting template for all migration files.

### Creating New Migrations

You can create a new migration script by running `yarn knex:migrate:make <migration_name>` in `/backend/`. A new migration file will be created in `src/migrations` with the format `<timestamp>_<kebab_cased_migration_name>.ts`.

1. You must write the forward and backend migration procedures yourself.
2. Be sure to name your new migration in the file itself.

### Performing Migrations

**[Important]** Make sure that `backend` and `database` Docker services are up before performing migrations.

**[Note]** It may be helpful to get familiar with [Knex's migration tool](https://knexjs.org/#Migrations) and its commands. You can also check for its help message by running `yarn knex --help` in `/backend/`.

Scripts have been set up in both `/` and `/backend/` (in their respective `package.json`) to aid you in typing less commands. You should check them out to know your options.

For simplicity, let's perform these actions in `/backend/`.

#### Go forward by one migration

```
yarn migrate:up
```

#### Migrate database to latest schema

```
yarn migrate:latest
```

#### Rollback by one migration

```
yarn migrate:down
```

#### Rollback the last batch of migrations

```
yarn migrate:rollback
```

---

## Notes

1. Unlike when ORMs are involved, performing migrations do not update the entity/model definitions defined in the backend. You must manually perform the appropriate changes yourself.

---

## References

- [Knex.js docs](https://knexjs.org)
