import type { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";


/**
 * config for database paired with knex.
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 54320,
      database: "basictest",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    log: {
      warn(message) {console.log(message)},
      error(message) {console.log(message)},
      deprecate(message) {console.log(message)},
      debug(message) {console.log(message)},
    },
    // ...knexSnakeCaseMappers
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers,
  },
};

export default config;
