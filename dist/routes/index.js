"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const users_apis_1 = __importDefault(require("./api/users.apis"));
const product_apis_1 = __importDefault(require("./api/product.apis"));
const cart_apis_1 = __importDefault(require("./api/cart.apis"));
const categories_apis_1 = __importDefault(require("./api/categories.apis"));
const orders_apis_1 = __importDefault(require("./api/orders.apis"));
const ratings_api_1 = __importDefault(require("./api/ratings.api"));
const stores_apis_1 = __importDefault(require("./api/stores.apis"));
const subscriptions_apis_1 = __importDefault(require("./api/subscriptions.apis"));
const transactions_apis_1 = __importDefault(require("./api/transactions.apis"));
const wallet_apis_1 = __importDefault(require("./api/wallet.apis"));
// import report from "./api/report.apis";
const router = express_1.default.Router();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, //1minute
    max: 30,
});
// apply rate limmter to all requests
router.use(limiter);
/// user api routes
router.use(users_apis_1.default);
/// product routes
router.use(product_apis_1.default);
/// cart routes
router.use(cart_apis_1.default);
/// cartegories routes
router.use(categories_apis_1.default);
/// orders routes
router.use(orders_apis_1.default);
/// ratings routes
router.use(ratings_api_1.default);
/// store routes
router.use(stores_apis_1.default);
/// subscriptions routes
router.use(subscriptions_apis_1.default);
/// transactions routes
router.use(transactions_apis_1.default);
/// wallet routes
router.use(wallet_apis_1.default);
// router.use("/report", report);
exports.default = router;
