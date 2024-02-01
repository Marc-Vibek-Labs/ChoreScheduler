import { join as pathJoin } from 'path';

const development = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_CONTAINER_NAME || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    database: process.env.POSTGRES_DB || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'YOUR_POSTGRES_PASSWORD',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: 'ts',
    directory: pathJoin(__dirname, '../../', 'migrations'),
    tableName: 'knex_migrations',
  },
};

export default {
  development,
  production: {
    ...development,
  },
};
