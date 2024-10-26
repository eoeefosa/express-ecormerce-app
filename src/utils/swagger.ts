import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { version } from "../../package.json";
dotenv.config();

export const { PORT } = process.env;
// import log from './logger'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express commerce Doc",
      // version,
      version: "1.0.0",

      description:
        "This is a simple CRUD API application made with Express and documented with Swagger \n [ Base URL: i.2geda.net/api]",
      termsOfService: "Hellow",
      contact: {
        name: "Osemwegie Efosa Emmanuel",
        email: "eoeefosa@gmail.com",
        url: "https://www.altostrat.com",
      },
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    schemes: ["http", "https"],
    servers: [
      {
        url: `http://localhost:${PORT}/docs`,
        description: "Local server",
      },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    // tags: [
    //   {
    //     name: "User",
    //     // description: "Endpoints",
    //   },
    // ],
    basePath: "/",
    components: {
      sercuritySchema: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    host: "localhost:1200",
    securitySchemes: {
      // corrected typo here
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  apis: ["./src/routes/api/*.ts", "./src/models/*.ts"],
};

const swaggerspec = swaggerJsdoc(options);

function swaggerDoc(app: Application, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    // res.setHeader("content-Type", "application/json");
    // res.send(swaggerDoc);
    res.send(swaggerspec);
  });

  //   log.info("Docs avalable at http://localhost:${port}/doc");
  console.log(`Docs avalable at http://localhost:${port}/docs`);
}

export default swaggerDoc;
