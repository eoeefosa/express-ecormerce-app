"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/transactionRoutes.ts
const express_1 = require("express");
const transaction_controller_1 = require("../../controllers/transaction.controller");
const router = (0, express_1.Router)();
router.post("/transactions", transaction_controller_1.createTransaction);
router.get("/transactions", transaction_controller_1.getTransactions);
router.get("/transactions/:id", transaction_controller_1.getTransactionById);
router.put("/transactions/:id", transaction_controller_1.updateTransaction);
router.delete("/transactions/:id", transaction_controller_1.deleteTransaction);
exports.default = router;
