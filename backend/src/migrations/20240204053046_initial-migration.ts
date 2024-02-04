import { Knex } from 'knex';
import * as Pino from 'pino';
import { dropTables } from '../common/helpers/database.helper';

enum TableNames {
  Users = 'cs_users',
}

const logger = Pino.pino();

const migrationName = 'initial-migration';
const msg = (s: string): string => `=== ${migrationName}: ${s} ===`;

export async function up(knex: Knex): Promise<void> {
  logger.info(msg('Beginning migration...'));

  // Create users table
  const userTableExists = await knex.schema.hasTable(TableNames.Users);
  if (!userTableExists) {
    logger.info(msg(`Creating ${TableNames.Users}`));
    await knex.schema.createTable(TableNames.Users, (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('username').unique().notNullable();
      table.string('passwordHash').notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.integer('tenantScore').notNullable().defaultTo(0);
      table.timestamp('createdDate').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedDate').notNullable().defaultTo(knex.fn.now());
      table
        .enum('status', [
          'active',
          'deleted',
          'inactive',
          'unverified',
          'password_unset',
        ])
        .notNullable()
        .defaultTo('unverified');
    });
  } else {
    logger.error(msg(`${TableNames.Users} already exists! Aborting...`));
    process.exit(1);
  }

  logger.info(msg('Migration complete'));
}

export async function down(knex: Knex): Promise<void> {
  logger.info(msg('Unwinding migration...'));

  await dropTables(knex, migrationName, Object.values(TableNames));

  logger.info(msg(`Migration unwound`));
}
