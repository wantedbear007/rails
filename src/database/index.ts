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
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 54320,
  database: "trainn",
});

export {pgPoolInstance, pgInstance}

// export default pgInstance;
