"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
// import log from './logger'
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express commerce Doc",
            // version,
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger \n [ Base URL: i.2geda.net/api]",
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
                url: `http://localhost:${exports.PORT}/docs`,
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
const swaggerspec = (0, swagger_jsdoc_1.default)(options);
function swaggerDoc(app, port) {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerspec));
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        // res.setHeader("content-Type", "application/json");
        // res.send(swaggerDoc);
        res.send(swaggerspec);
    });
    //   log.info("Docs avalable at http://localhost:${port}/doc");
    console.log(`Docs avalable at http://localhost:${port}/docs`);
}
exports.default = swaggerDoc;
