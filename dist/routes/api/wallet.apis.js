"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/walletRoutes.ts
const express_1 = require("express");
const wallet_controller_1 = require("../../controllers/wallet.controller");
const router = (0, express_1.Router)();
// User Routes
router.get("/wallet/:userId/balance", wallet_controller_1.getWalletBalance);
router.post("/wallet/:userId/add-funds", wallet_controller_1.addFundsToWallet);
router.post("/wallet/:userId/withdraw", wallet_controller_1.withdrawFundsFromWallet);
router.get("/wallet/:userId/transactions", wallet_controller_1.getWalletTransactions);
// Admin Routes
router.get("/admin/all-wallets", wallet_controller_1.getAllWallets);
router.put("/admin/:userId/adjust-balance", wallet_controller_1.adjustWalletBalance);
exports.default = router;
