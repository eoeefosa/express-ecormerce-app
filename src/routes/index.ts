import express from "express";
import RateLimit from "express-rate-limit";
import userApi from "./api/users.apis";
import product from "./api/product.apis";
import cart from "./api/cart.apis";
import cartegories from "./api/categories.apis";
import orders from "./api/orders.apis";
import ratings from "./api/ratings.api";
import stores from "./api/stores.apis";
import subscriptions from "./api/subscriptions.apis";
import transactions from "./api/transactions.apis";
import wallet from "./api/wallet.apis";
import swaggerDoc from "../utils/swagger";
// import report from "./api/report.apis";

const router = express.Router();

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, //1minute
  max: 30,
});

// apply rate limmter to all requests
router.use(limiter);
/// user api routes
router.use(userApi);
/// product routes
router.use(product);
/// cart routes
router.use(cart);
/// cartegories routes
router.use(cartegories);
/// orders routes
router.use(orders);
/// ratings routes
router.use(ratings);
/// store routes
router.use(stores);
/// subscriptions routes
router.use(subscriptions);
/// transactions routes
router.use(transactions);
/// wallet routes
router.use(wallet);
// router.use("/report", report);

export default router;
