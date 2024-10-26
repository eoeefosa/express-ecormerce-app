import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
// import log from './logger'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express commerce Doc",
      version,
    },
    components: {
      sercuritySchema: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/routes/api/*.ts", "./src/schema/*.ts"],
};

const swaggerspec = swaggerJsdoc(options);

function swaggerDoc(app: Application, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("content-Type", "application/json");
    res.send(swaggerDoc);
  });

  //   log.info("Docs avalable at http://localhost:${port}/doc");
  console.log("Docs avalable at http://localhost:${port}/doc");
}

export default swaggerDoc;
