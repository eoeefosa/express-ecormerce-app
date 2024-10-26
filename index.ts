import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import configs from "./configs";

import swaggerDoc from "./src/utils/swagger";
import routes from "./src/routes/index";

// const PORT = configs.port || 5000;
const PORT = 5000;

const app: Application = express();

configs.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(helmet());

app.use(routes);

// swaggerDoc(app, PORT);


app.get("/", (_req: Request, res: Response) => {
  res.json("Hello server! 🚀");
});

app.listen(PORT, () => {
  console.log("Sever is starting at port: ${PORT}");
  swaggerDoc(app, PORT);
});
export default app;
