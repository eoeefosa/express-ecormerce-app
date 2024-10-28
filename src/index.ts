import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import configs from "./configs";

import swaggerDoc from "./utils/swagger";
import routes from "./routes/index";
import http from "http";

// const PORT = configs.port || 5000;
const PORT = 1200;

const app = express();

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

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Sever is starting at port: ${PORT}`);
  swaggerDoc(app, PORT);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing server gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Closing server gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

export default app;
