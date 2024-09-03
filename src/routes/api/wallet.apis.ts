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
router.get("/:userId/balance", getWalletBalance);
router.post("/:userId/add-funds", addFundsToWallet);
router.post("/:userId/withdraw", withdrawFundsFromWallet);
router.get("/:userId/transactions", getWalletTransactions);

// Admin Routes
router.get("/admin/all-wallets", getAllWallets);
router.put("/admin/:userId/adjust-balance", adjustWalletBalance);

export default router;
