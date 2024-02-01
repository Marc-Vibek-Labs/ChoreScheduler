import { Knex } from 'knex';
import * as Pino from 'pino';

const logger = Pino.pino();

export async function dropTables(
  knex: Knex,
  migrationName: string,
  tables: string[],
): Promise<void> {
  const msg = (s: string): string => `=== ${migrationName}: ${s} ===`;

  for (const table of tables) {
    await knex
      .raw(`DROP TABLE IF EXISTS "${table}" CASCADE`)
      .then(() => {
        logger.info(msg(`${table} has been dropped.`));
      })
      .catch((reason: any) => {
        logger.error(msg(`Failed to drop table ${table}`));
        logger.error(reason);
        process.exit(1);
      });
  }
}

export async function alterEnum(
  knex: Knex,
  migrationName: string,
  tableName: string,
  columnName: string,
  constraintName: string,
  enums: string[],
): Promise<void> {
  const msg = (s: string): string => `=== ${migrationName}: ${s} ===`;

  await knex.schema
    .raw(
      `
    ALTER TABLE "${tableName}"
    DROP CONSTRAINT "${constraintName}",
    ADD CONSTRAINT "${constraintName}" 
    CHECK ("${columnName}" IN (${enums.map((item) => `'${item}'`).join(', ')}))
  `,
    )
    .then(() => {
      logger.info(
        msg(
          `${constraintName} enum constraint for ${tableName} has been altered.`,
        ),
      );
    })
    .catch((reason: any) => {
      logger.error(
        msg(`Failed to alter constraint ${constraintName} for ${tableName}`),
      );
      logger.error(reason);
      process.exit(1);
    });
}

export async function renameEnums(
  knex: Knex,
  migrationName: string,
  tableName: string,
  columnName: string,
  constraintName: string,
  enumMaps: {
    oldValue: string;
    newValue: string;
  }[],
): Promise<void> {
  const msg = (s: string): string => `=== ${migrationName}: ${s} ===`;

  logger.info(msg(`Adding types to ${tableName}`));
  await alterEnum(
    knex,
    migrationName,
    tableName,
    columnName,
    constraintName,
    enumMaps.reduce((newArray: string[], enumMap) => {
      newArray.push(enumMap.oldValue);
      newArray.push(enumMap.newValue);
      return newArray;
    }, []),
  );

  logger.info(msg(`Updating ${tableName} ${columnName}s`));
  for (const enumMap of enumMaps) {
    await knex(tableName)
      .update(columnName, enumMap.newValue)
      .where(columnName, enumMap.oldValue);
  }

  logger.info(msg(`Removing unused types from ${tableName}`));
  await alterEnum(
    knex,
    migrationName,
    tableName,
    columnName,
    constraintName,
    enumMaps.map((enumMap) => enumMap.newValue),
  );
}
