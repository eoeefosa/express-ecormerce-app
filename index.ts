import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import configs from "./configs";

const PORT = configs.port || 5000;

const app: Application = express();

configs.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(helmet());

app.get("/", (_req: Request, res: Response) => {
  res.json("Hello server! 🚀");
});

app.listen(PORT, () => {
  console.log("Sever is starting at port: ${PORT}");
});
export default app;
