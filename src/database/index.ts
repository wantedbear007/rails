import pg, { Pool } from "pg";

const { Client } = pg;

const pgInstance = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 54320,
  database: "trainn",
});

const pgPoolInstance = new Pool({
  // user: "postgres",
  // password: "postgres",
  // host: "localhost",
  // port: 54320,
  // database: "trainn",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export { pgPoolInstance, pgInstance };
