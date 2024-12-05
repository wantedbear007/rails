import "dotenv/config";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import { corsOptions } from "./middleware/config";
// import summarizedRouter from "./routes/summarized.routes";
import pg from 'pg'
import logger from "./utils/logger";
import adminRoutes from "./routes/admin.routes";

const app: Express = express();
/**
 * init knex and start database.
 */
async function startServices(): Promise<void> {

const { Client } = pg
// const client = new Client()
// console.log("cl", client)

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 54320,
  database: 'trainn',
})
await client.connect()
 
try {
   const res = await client.query('SELECT $1::text as message', ['Hello world!'])

   const lol = await client.query("select * from stations");
   console.log(lol.rows)
  //  console.log(res.rows[0].message) // Hello world!
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}
  

  // const db = Knex(
  //   process.env.PRODUCTION === "false"
  //     ? config?.development
  //     : config?.production
  // );
  // try {
  //   await db.raw("SELECT 1");
  //   Objection.Model.knex(db);
  //   logger.info("Database connection successful!");
  // } catch (error) {
  //   logger.error("Database connection failed:", error);
  //   process.exit(1);
  // } finally {
  //   // await db.destroy(); // to destroy database instance
  // }
}

startServices().then(() => {
  const port: number | string = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(
      `[server]: Server is running at http://${process.env.DOMAIN || "localhost"}:${port}`
    );
  });
});

/**
 * security middlewares.
 */
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  // const user = await Unsummarized.query();
  // console.log("use", user);

  res.status(200).send("hello from bhanupratap singh");
});

app.use("/a", adminRoutes);
