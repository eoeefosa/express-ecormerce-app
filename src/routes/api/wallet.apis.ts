// src/routes/walletRoutes.ts
import { Router } from "express";
import {
  getWalletBalance,
  addFundsToWallet,
  withdrawFundsFromWallet,
  getWalletTransactions,
  getAllWallets,
  adjustWalletBalance,
} from "../../controllers/wallet.controller";

const router = Router();

// User Routes
router.get("/wallet/:userId/balance", getWalletBalance);
router.post("/wallet/:userId/add-funds", addFundsToWallet);
router.post("/wallet/:userId/withdraw", withdrawFundsFromWallet);
router.get("/wallet/:userId/transactions", getWalletTransactions);

// Admin Routes
router.get("/admin/all-wallets", getAllWallets);
router.put("/admin/:userId/adjust-balance", adjustWalletBalance);

export default router;
