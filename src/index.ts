import "dotenv/config";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import { pgInstance } from "./database";
import bookingRoute from "./routes/booking.routes";
import { Mutex } from "async-mutex";

const app: Express = express();
export const mutexInstance: Mutex = new Mutex();

async function startServices(): Promise<void> {
  console.log("helllllllllllll--------------------------------------");

  try {
    await pgInstance.connect();
    // const res = await pgInstance.query("SELECT $1::text as message", [
    //   "Hello world!",
    // ]);
  } catch (err) {
    // console.log("000000000000000000000000000000000000000000000000");
    // console.log(process.env.DB_HOST);
    // console.log("00000000000000000000000000000000000000000000");
    console.error(err);
  }
}

startServices().then(() => {
  const port: number | string = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      `[server]: Server is running at http://${process.env.DOMAIN || "localhost"}:${port}`
    );
  });
});

/**
 * security middlewares.
 */
// app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("hello new api");
});

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use("/", bookingRoute);
