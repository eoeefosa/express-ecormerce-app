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
import user from "./api/users.apis";
import wallet from "./api/wallet.apis";
// import report from "./api/report.apis";

const router = express.Router();

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, //1minute
  max: 30,
});

// apply rate limmter to all requests
router.use(limiter);

router.use("/user", userApi);
router.use("/product", product);
router.use("/cart", cart);
router.use("/cartegory", cartegories);
router.use("/order", orders);
router.use("/ratings", ratings);
router.use("/store", stores);
router.use("/subscriptions", subscriptions);
router.use("/transactions", transactions);
router.use("/user", user);
router.use("/wallet", wallet);
// router.use("/report", report);

export default router;
