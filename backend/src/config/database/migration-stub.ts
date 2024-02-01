import { Knex } from 'knex';
import * as Pino from 'pino';
import { dropTables } from 'src/common/helpers/database.helper';

enum TableNames {
  Users = 'cs_users',
}

const logger = Pino.pino();

const migrationName = 'MIGRATION-NAME-HERE';
const msg = (s: string): string => `=== ${migrationName}: ${s} ===`;

export async function up(knex: Knex): Promise<void> {
  logger.info(msg('Beginning migration...'));

  await knex.schema.hasTable('knex_migrations');

  logger.info(msg('Migration complete!'));
}

export async function down(knex: Knex): Promise<void> {
  logger.info(msg('Unwinding migration...'));

  await knex.schema.hasTable('knex_migrations');

  await dropTables(knex, migrationName, Object.values(TableNames));

  logger.info(msg(`Migration unwound`));
}
