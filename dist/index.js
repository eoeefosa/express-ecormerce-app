"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const configs_1 = __importDefault(require("./configs"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const index_1 = __importDefault(require("./routes/index"));
const http_1 = __importDefault(require("http"));
// const PORT = configs.port || 5000;
const PORT = 1200;
const app = (0, express_1.default)();
configs_1.default.connect();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use(index_1.default);
// swaggerDoc(app, PORT);
app.get("/", (_req, res) => {
    res.json("Hello server! 🚀");
});
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Sever is starting at port: ${PORT}`);
    (0, swagger_1.default)(app, PORT);
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
exports.default = app;
