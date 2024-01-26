import { Knex } from 'knex'
import knexfile from './knexfile'

export function development(): Knex.Config {
  return {
    ...knexfile.development
  }
}

export function production(): Knex.Config {
  return {
    ...knexfile.production
  }
}
